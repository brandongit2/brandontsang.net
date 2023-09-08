import type {ReactElement} from "react"

import {loadMsdfFontAtlas, loadSdfFontAtlas} from "./(name-canvas)/loadFontAtlas"
import NameParallax from "./NameParallax"
import QaWrapper from "./QaWrapper"

export default async function Home(): Promise<ReactElement | null> {
	const sdfFontAtlas = await loadSdfFontAtlas()
	const msdfFontAtlas = await loadMsdfFontAtlas()

	return (
		<div className="mx-auto flex max-w-2xl flex-col">
			<NameParallax sdfFontAtlas={sdfFontAtlas} msdfFontAtlas={msdfFontAtlas} />

			<div className="mx-auto max-w-xl px-3 pb-[50%] text-[oklch(97.1%_0.07_110.543)]">
				<QaWrapper />
			</div>
		</div>
	)
}
