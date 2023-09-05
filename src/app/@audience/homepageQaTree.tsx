import type {QaNode} from "@/components/QaTree/types"

export const homePageQaTree: QaNode = {
	question: `Who are you?`,
	answer: (
		<p>Hey! I am a Toronto-based frontend web developer who loves building unique and challenging user interfaces.</p>
	),
	furtherQuestions: [
		{
			question: `What do you do?`,
			answer: <p>Fucking nothing</p>,
		},
	],
}
