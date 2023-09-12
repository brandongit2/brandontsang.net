import {Code} from "bright"

import {fixedWidthCols} from "./codeSnippets"

export default function DesktopDynamicPanelsReflow() {
	return (
		<>
			<p>
				The problem with this is that while the panels are transitioning, their widths are constantly changing, leading
				to a ton of ugly content reflowing. This was solved using JavaScript to measure the width of the page, and
				apportioning the widths among the columns. So the columns change width, but the content within them stays at
				their full width.
			</p>
			<div className="-my-3.5 max-w-[calc(100vw-2.25rem)] text-sm leading-[normal]">
				<Code lang="tsx">{fixedWidthCols}</Code>
			</div>
		</>
	)
}
