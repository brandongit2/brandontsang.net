import clsx from "clsx"
import {motion, useAnimationFrame} from "framer-motion"
import {createElement, useEffect, useMemo, useRef, useState} from "react"

import type {QaNode as QaNodeType} from "./types"

// Call `.normalize()` on the element before calling this function, please!
function* wrapTextNodes(element: Element, remainingChars: number): Generator<undefined, number, number> {
	let _remainingChars = remainingChars

	if (element.childNodes.length === 0) return _remainingChars

	for (let i = 0; i < element.childNodes.length; i++) {
		const child = element.childNodes[i]
		if (child instanceof Element) {
			_remainingChars = yield* wrapTextNodes(child, _remainingChars)
			child.setAttribute(`data-visible`, ``)
		} else if (child instanceof Text) {
			if (element.hasAttribute(`data-visible`)) continue

			const textContent = child.data
			if (textContent.trim().length === 0) continue

			const span = document.createElement(`span`)
			span.setAttribute(`data-visible`, ``)
			child.before(span)
			for (let i = 0; i < textContent.length; i++) {
				const textToWrap = textContent.charAt(i)
				child.data = textContent.slice(i + 1)
				span.textContent += textToWrap
				_remainingChars--
				if (_remainingChars <= 0) {
					_remainingChars += yield
				}
			}
		}
	}

	for (const child of element.childNodes) {
		if (
			child instanceof Element &&
			child.tagName.toLowerCase() === `span` &&
			child.hasAttribute(`data-visible`) &&
			child.attributes.length === 1
		) {
			child.before(child.textContent ?? ``)
			child.remove()
		}
	}

	return _remainingChars
}

export type QaNodeProps = {
	node: QaNodeType
	root?: boolean
}

export default function QaNode({node, root = false}: QaNodeProps) {
	const answerElement = useMemo(
		() => (typeof node.answer === `function` ? createElement(node.answer) : node.answer),
		[node.answer],
	)

	const [showAnswer, setShowAnswer] = useState(root)
	const [showChildren, setShowChildren] = useState(false)

	const answerRef = useRef<HTMLDivElement>(null)
	const ongoingWrapping = useRef<ReturnType<typeof wrapTextNodes> | null>(null)

	useEffect(() => {
		if (!showAnswer) return
		if (!answerRef.current || ongoingWrapping.current) return

		answerRef.current.normalize()
		ongoingWrapping.current = wrapTextNodes(answerRef.current, 5)

		const mutationObserver = new MutationObserver(() => {
			if (!answerRef.current || ongoingWrapping.current) return
			answerRef.current.normalize()
			ongoingWrapping.current = wrapTextNodes(answerRef.current, 5)
		})
		mutationObserver.observe(answerRef.current, {childList: true, subtree: true})

		return () => {
			mutationObserver.disconnect()
		}
	}, [answerElement, showAnswer])

	useAnimationFrame((_, delta) => {
		if (!answerRef.current || !ongoingWrapping.current) return
		const res = ongoingWrapping.current.next(delta / 2)
		if (res.done) {
			ongoingWrapping.current = null
			setTimeout(() => setShowChildren(true), 150)
		}
	})

	return (
		<>
			{showAnswer ? (
				<>
					<motion.div
						className="relative flex flex-col gap-4 [&_*]:invisible [&_[data-visible]]:visible"
						layout="position"
						ref={answerRef}
					>
						{answerElement}
					</motion.div>

					{showChildren && node.furtherQuestions?.map((child) => <QaNode key={child.question} node={child} />)}
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
