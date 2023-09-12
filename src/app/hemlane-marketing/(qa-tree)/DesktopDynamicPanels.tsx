import {Code} from "bright"

import {columnAnimCss, columnAnimHtml} from "./codeSnippets"
import Cde from "@/components/QaTree/Cde"

export default function DesktopDynamicPanels() {
	return (
		<>
			<p>
				The first approach was to put the three columns into a CSS grid, which worked fine, except I realized that grid
				column lines cannot be transitioned. Flexbox <Cde>grow</Cde> values, as I would later find out, could in fact be
				transitioned. And that was the revelation that allowed me to implement the final design{` `}
				<span className="text-sm opacity-50">(and made me very happy when I discovered it)</span>.
			</p>
			<p>
				So each column gets a <Cde>grow</Cde> value, and that value is set to <Cde>0</Cde> when the column is closed:
			</p>
			<div className="-my-3.5 max-w-[calc(100vw-2.25rem)] text-sm leading-[normal]">
				<Code lang="html" title="HTML">
					{columnAnimHtml}
				</Code>
				<Code lang="scss" title="SCSS">
					{columnAnimCss}
				</Code>
			</div>
		</>
	)
}
