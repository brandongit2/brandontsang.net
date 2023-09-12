import clsx from "clsx"
import {motion, useAnimationFrame} from "framer-motion"
import {throttle} from "lodash-es"
import {Suspense, useEffect, useRef, useState} from "react"

import type {QaNode as QaNodeType} from "./types"

function isWrapLocked(node: Node) {
	let currentNode: Node | null = node
	while (currentNode) {
		if (currentNode instanceof Element && currentNode.hasAttribute(`data-wrap-lock`)) return true
		currentNode = currentNode.parentElement ?? currentNode.parentNode
	}
	return false
}

function makeElementInvisible(element: Element) {
	const tagName = element.tagName.toLowerCase()
	if (tagName === `style` || tagName === `svg`) return

	element.setAttribute(`data-invisible`, ``)
	element.childNodes.forEach((child) => {
		if (child instanceof Element) {
			makeElementInvisible(child)
		} else if (child instanceof Text) {
			const span = document.createElement(`span`)
			span.setAttribute(`data-text-node-wrapper`, ``)
			span.setAttribute(`data-invisible`, ``)
			span.textContent = child.data
			child.before(span)
			child.remove()
		}
	})
}

function filterOutDescendants(nodes: Node[]) {
	const nodeSet = new Set(nodes)
	nodes.forEach((node) => {
		let current = node.parentElement
		while (current) {
			if (nodeSet.has(current)) {
				nodeSet.delete(node)
				break
			}
			current = current.parentElement
		}
	})
	return Array.from(nodeSet)
}

function* wrapTextNodes(element: Element, remainingChars: number): Generator<undefined, number, number | `quit`> {
	if (!element.hasAttribute(`data-invisible`)) return remainingChars
	element.removeAttribute(`data-invisible`)
	if (element.childNodes.length === 0 || remainingChars <= 0) return remainingChars
	element.setAttribute(`data-wrap-lock`, ``)

	let _remainingChars = remainingChars
	for (let i = 0; i < element.childNodes.length; i++) {
		const child = element.childNodes[i]
		if (child instanceof Element) {
			if (child.hasAttribute(`data-text-node-wrapper`)) {
				let visibleSpan: HTMLSpanElement
				let invisibleSpan: HTMLSpanElement

				if (child.hasAttribute(`data-invisible`)) {
					visibleSpan = document.createElement(`span`)
					visibleSpan.setAttribute(`data-text-node-wrapper`, ``)
					child.before(visibleSpan)
					invisibleSpan = child as HTMLSpanElement
				} else if (child.nextElementSibling?.hasAttribute(`data-invisible`)) {
					visibleSpan = child as HTMLSpanElement
					invisibleSpan = child.nextElementSibling as HTMLSpanElement
				} else {
					child.before(child.textContent ?? ``)
					child.remove()
					continue
				}
				const textContent = (visibleSpan.textContent ?? ``) + (invisibleSpan.textContent ?? ``)
				if (textContent.trim().length === 0) {
					visibleSpan.before(textContent)
					invisibleSpan.remove()
					visibleSpan.remove()
					continue
				}

				for (let i = 0; i < textContent.length; i++) {
					const textToWrap = textContent.charAt(i)
					invisibleSpan.textContent = textContent.slice(i + 1)
					visibleSpan.textContent += textToWrap
					_remainingChars--
					if (_remainingChars <= 0) {
						const nextRes = yield
						if (nextRes === `quit`) return 0
						_remainingChars += nextRes
					}
				}

				invisibleSpan.remove()
				visibleSpan.before(textContent)
				visibleSpan.remove()
			} else {
				_remainingChars = yield* wrapTextNodes(child, _remainingChars)
			}
		}
	}

	element.removeAttribute(`data-wrap-lock`)
	return _remainingChars
}

export type QaNodeProps = {
	node: QaNodeType
	root?: boolean
}

export default function QaNode({node, root = false}: QaNodeProps) {
	const [showAnswer, setShowAnswer] = useState(root)
	const [initialInvisibility, setInitialInvisibility] = useState(true)
	const [showFurtherQuestions, setShowFurtherQuestions] = useState(false)

	const answerRef = useRef<HTMLDivElement>(null)
	const ongoingWrappings = useRef<ReturnType<typeof wrapTextNodes>[]>([])

	useEffect(() => {
		if (!showAnswer || !answerRef.current) return

		makeElementInvisible(answerRef.current)
		setInitialInvisibility(false)
		ongoingWrappings.current.push(wrapTextNodes(answerRef.current, 5))

		let mutationQueue = new Set<MutationRecord>()
		const throttledMutationHandler = throttle(() => {
			mutationQueue.forEach((mutation) => {
				if (mutation.type !== `childList`) return
				filterOutDescendants(Array.from(mutation.addedNodes))
					.filter((node) => !isWrapLocked(node))
					.filter((node): node is Element => node instanceof Element && document.body.contains(node))
					.forEach((node) => {
						if (!(node instanceof Element) || !document.body.contains(node)) return
						makeElementInvisible(node)
						ongoingWrappings.current.push(wrapTextNodes(node, 5))
					})
			})
			mutationQueue = new Set()
		}, 500)

		const mutationObserver = new MutationObserver((mutations) => {
			mutationQueue = new Set([...mutationQueue, ...mutations])
			throttledMutationHandler()
		})
		mutationObserver.observe(answerRef.current, {childList: true, subtree: true})

		return () => {
			mutationObserver.disconnect()
			ongoingWrappings.current.forEach((wrapping) => wrapping.next(`quit`))
			ongoingWrappings.current = []
		}
	}, [showAnswer])

	useAnimationFrame((_, delta) => {
		if (!answerRef.current || ongoingWrappings.current.length === 0) return
		ongoingWrappings.current = ongoingWrappings.current.filter((wrapping) => !wrapping.next(delta / 2).done)
		if (ongoingWrappings.current.length === 0) {
			setTimeout(() => setShowFurtherQuestions(true), 150)
		}
	})

	return (
		<>
			{showAnswer ? (
				<>
					<motion.div
						className={clsx(
							`relative flex flex-col gap-4 [&_[data-invisible]]:invisible`,
							initialInvisibility && `invisible`,
						)}
						layout="position"
						ref={answerRef}
					>
						{node.answer}
					</motion.div>

					{showFurtherQuestions &&
						node.furtherQuestions?.map((child) => (
							<Suspense key={child.question}>
								<QaNode node={child} />
							</Suspense>
						))}
				</>
			) : (
				<motion.button
					layout="position"
					type="button"
					initial={{opacity: 0}}
					animate={{
						opacity: 1,
						transition: {opacity: {duration: 0.5}},
					}}
					onClick={() => {
						setShowAnswer(true)
					}}
					className="relative mx-auto w-2/3 min-w-[18rem] rounded-xl border border-text/50 px-3 py-1"
					style={{
						backgroundImage: `linear-gradient(
									oklch(98% 0.157 110.543 / 0.3),
									oklch(80% 0.157 110.543 / 0.3) calc(100% - 0.8rem),
									oklch(60% 0.157 110.543 / 0.3)
								)`,
						boxShadow: `inset 0 0 6px oklch(0.9 0 0 / 0.4)`,
					}}
				>
					<span
						className={clsx(
							`relative inline-block text-[oklch(100%_0.05_110.543)]`,
							`before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:inline-block before:h-full before:w-full before:translate-x-[calc(-50%-1px)] before:translate-y-[calc(-50%+1px)] before:text-black before:content-[--text-content]`,
						)}
						style={{
							[`--text-content` as any]: `"${node.question}"`,
						}}
					>
						{node.question}
					</span>
				</motion.button>
			)}
		</>
	)
}
