import {Code} from "bright"

import type {QaNode} from "@/components/QaTree/types"

import {columnAnimCss, columnAnimHtml} from "./codeSnippets"
import Bg from "@/components/QaTree/Bg"
import Cde from "@/components/QaTree/Cde"

export const hemlaneMarketingQaTree: QaNode = {
	question: `What is SprintZero?`,
	answer: (
		<p className="indent-0">
			The page has a <Bg>dynamic layout</Bg>, with a panel that slides out from the right. In the background is a lava
			lamp-inspired effect, created in <Bg>WebGL</Bg>. When viewed on a mobile device, the the sliding panel is replaced
			with an interaction that resembles opening and closing iPhone apps.
		</p>
	),
	furtherQuestions: [
		{
			question: `Tell me about the desktop layout.`,
			answer: (
				<p>
					The marketing team came to me with a concept of creating groups from the target audience, and segmenting the
					messaging per-group. The idea of the page then was for information to start broad on the left, and be more
					specific on the right. Together, we arrived on the layout you see in the gallery. The lava lamp effect was
					added by myself after a bit of personal experimenting with WebGL.
				</p>
			),
			furtherQuestions: [
				{
					question: `How did you do the dynamic panels?`,
					answer: (
						<>
							<p>
								The first approach would be to put the three columns into a CSS grid, which works except grid column
								lines cannot be transitioned. Flexbox <Cde>grow</Cde> values, as I would later find out, could be
								transitioned. And that was the revelation that allowed me to implement the final design.
							</p>
							<p>
								So each column gets a <Cde>grow</Cde> value, and that value is set to <Cde>0</Cde> when the column is
								closed:
							</p>
							<div className="-my-3.5 text-sm leading-[normal]">
								<Code lang="html" title="HTML">
									{columnAnimHtml}
								</Code>
								<Code lang="scss" title="SCSS">
									{columnAnimCss}
								</Code>
							</div>
						</>
					),
				},
				{
					question: `How did you do the lava lamp effect?`,
					answer: <p></p>,
				},
			],
		},
		{
			question: `Tell me about the mobile layout.`,
			answer: <p></p>,
		},
	],
}
