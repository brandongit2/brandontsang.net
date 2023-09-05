import {type ReactNode} from "react"

export type QaNode = {
	question: string
	answer: ReactNode | (() => ReactNode)
	furtherQuestions?: QaNode[]
}
