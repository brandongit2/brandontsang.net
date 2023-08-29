import {create} from "zustand"

import {QADescription} from "./QADescription"

export type QAStore = {
	mostRecentAnswer: string
	setMostRecentAnswer: (answer: string) => void
}

export const useQAStore = create<QAStore>((set) => ({
	mostRecentAnswer: QADescription.answer,
	setMostRecentAnswer: (answer: string) => set({mostRecentAnswer: answer}),
}))
