import type {ReactElement} from "react"

import {homePageQaTree} from "./homepageQaTree"
import QaTree from "@/components/QaTree"

export default function MainPageAudience(): ReactElement | null {
	return (
		<div className="max-w-xl font-extralight leading-snug tracking-wide text-[oklch(97.1%_0.07_110.543)]">
			<QaTree qaTree={homePageQaTree} />
		</div>
	)
}
