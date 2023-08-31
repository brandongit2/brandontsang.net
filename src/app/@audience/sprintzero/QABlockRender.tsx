"use client"

import clsx from "clsx"
import {MotionConfig, motion} from "framer-motion"
import {useState, type ReactElement, useEffect, useRef, createElement, useMemo} from "react"
import {useInterval} from "react-use"

import {type QABlock} from "./QaTree"
import {springVarHelper} from "@/helpers/springVarHelper"

const textPerTick = 5
// Call `.normalize()` on the element before calling this function, please!
function* wrapTextNodes(element: Element): Generator<undefined, undefined> {
	let tickCharCounter = 0

	if (element.childNodes.length === 0) return

	for (let i = 0; i < element.childNodes.length; i++) {
		const child = element.childNodes[i]
		if (child instanceof Element) {
			yield* wrapTextNodes(child)
			child.setAttribute(`data-visible`, ``)
			tickCharCounter += 5
		} else if (child instanceof Text) {
			if (element.hasAttribute(`data-visible`)) continue

			const textContent = child.data
			if (textContent.trim().length === 0) continue

			const span = document.createElement(`span`)
			span.setAttribute(`data-visible`, ``)
			child.before(span)
			for (let i = 0; i < textContent.length; i += textPerTick) {
				const textToWrap = textContent.slice(i, i + textPerTick)
				child.data = textContent.slice(i + textPerTick)
				span.textContent += textToWrap
				tickCharCounter += textToWrap.length
				if (tickCharCounter >= textPerTick) {
					yield
					tickCharCounter = 0
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

	element.removeAttribute(`data-traversal-lock`)
}

export type QABlockRenderProps = {
	qaBlock: QABlock
}

export default function QABlockRender({qaBlock}: QABlockRenderProps): ReactElement | null {
	const [expandedQuestions, setExpandedQuestions] = useState<number[]>([])

	const [showButtons, setShowButtons] = useState(false)

	const answerElement = useMemo(
		() => (typeof qaBlock.answer === `function` ? createElement(qaBlock.answer) : qaBlock.answer),
		[qaBlock.answer],
	)

	const answerRef = useRef<HTMLDivElement>(null)
	const ongoingWrapping = useRef<Generator | null>(null)

	useEffect(() => {
		if (!answerRef.current || ongoingWrapping.current) return

		answerRef.current.normalize()
		ongoingWrapping.current = wrapTextNodes(answerRef.current)

		const mutationObserver = new MutationObserver(() => {
			if (!answerRef.current || ongoingWrapping.current) return
			answerRef.current.normalize()
			ongoingWrapping.current = wrapTextNodes(answerRef.current)
		})
		mutationObserver.observe(answerRef.current, {childList: true, subtree: true})

		return () => {
			mutationObserver.disconnect()
		}
	}, [answerElement, qaBlock.answer])

	useInterval(() => {
		if (!answerRef.current || !ongoingWrapping.current) return
		const res = ongoingWrapping.current.next()
		if (res.done) {
			ongoingWrapping.current = null
			setTimeout(() => setShowButtons(true), 150)
		}
	}, 10)

	return (
		<MotionConfig transition={{layout: {type: `spring`, velocity: -180, ...springVarHelper(150, 0.6)}}}>
			<motion.div
				className="relative font-extralight leading-snug tracking-wide text-[oklch(97.1%_0.07_110.543)] [&_*]:invisible [&_[data-visible]]:visible"
				layout="position"
				ref={answerRef}
			>
				{answerElement}
			</motion.div>
			{qaBlock.furtherQuestions?.map((q, i) =>
				expandedQuestions.includes(i) ? (
					<QABlockRender key={q.question} qaBlock={q} />
				) : showButtons ? (
					<motion.button
						layout="position"
						type="button"
						key={q.question}
						initial={{opacity: 0}}
						animate={{
							opacity: 1,
							transition: {opacity: {duration: 0.5}},
						}}
						onClick={() => {
							setExpandedQuestions((v) => v.concat(i))
						}}
						className="relative mx-auto my-1 w-2/3 rounded-xl border border-text/50 px-3 py-1 [&+:not(button)]:mt-2 [:not(button)+&]:mt-3"
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
								[`--text-content` as any]: `"${q.question}"`,
							}}
						>
							{q.question}
						</span>
					</motion.button>
				) : null,
			)}
		</MotionConfig>
	)
}
