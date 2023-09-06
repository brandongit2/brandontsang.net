import type {ReactElement} from "react"

import {loadMsdfFontAtlas, loadSdfFontAtlas} from "./(name-canvas)/loadFontAtlas"
import NameParallax from "./NameParallax"
import {rootQaTree} from "./rootQaTree"
import QaTree from "@/components/QaTree"

export default async function Home(): Promise<ReactElement | null> {
	const sdfFontAtlas = await loadSdfFontAtlas()
	const msdfFontAtlas = await loadMsdfFontAtlas()

	return (
		<div className="mx-auto flex max-w-2xl flex-col">
			<NameParallax sdfFontAtlas={sdfFontAtlas} msdfFontAtlas={msdfFontAtlas} />

			<div className="mx-auto max-w-xl px-3 pb-[50%] text-justify font-light leading-snug tracking-wide text-[oklch(97.1%_0.07_110.543)] [&_p]:indent-8">
				<QaTree qaTree={rootQaTree} />
			</div>
		</div>
	)
}
