"use client"

import {motion} from "framer-motion"
import {useState, type ReactElement} from "react"
import {useInterval} from "react-use"

import type {QABlock} from "./QADescription"

import {useQAStore} from "./useQAStore"

export type QABlockRenderProps = {
	qaBlock: QABlock
}

export default function QABlockRender({qaBlock}: QABlockRenderProps): ReactElement | null {
	const [expandedQuestions, setExpandedQuestions] = useState<number[]>([])
	const mostRecentAnswer = useQAStore((s) => s.mostRecentAnswer)
	const setMostRecentAnswer = useQAStore((s) => s.setMostRecentAnswer)

	const [text, setText] = useState(``)
	useInterval(() => {
		if (text.length === qaBlock.answer.length) return
		setText((t) => t + qaBlock.answer.slice(t.length, t.length + 3))
	}, 5)

	return (
		<>
			<motion.p
				layout="position"
				initial={{opacity: 0.3}}
				animate={{opacity: qaBlock.answer === mostRecentAnswer ? 1 : 0.3}}
				transition={{duration: 0.05, opacity: {duration: 0.5}}}
			>
				{text}
			</motion.p>
			{qaBlock.furtherQuestions?.map((q, i) =>
				expandedQuestions.includes(i) ? (
					<QABlockRender key={q.question} qaBlock={q} />
				) : (
					<motion.button
						layout="position"
						type="button"
						key={q.question}
						transition={{duration: 0.05}}
						onClick={() => {
							setExpandedQuestions((v) => v.concat(i))
							setMostRecentAnswer(q.answer)
						}}
						className="mx-auto my-2 w-2/3 rounded-lg border border-white/80 bg-white/10 px-2 py-1"
					>
						{q.question}
					</motion.button>
				),
			)}
			{/* <hr /> */}
		</>
	)
}
