import type {ReactElement} from "react"

import {loadMsdfFontAtlas, loadSdfFontAtlas} from "../(name-canvas)/loadFontAtlas"
import NameCanvas from "../(name-canvas)/NameCanvas"

export default async function MainPageStage(): Promise<ReactElement | null> {
	const msdfFontAtlas = await loadMsdfFontAtlas()
	const sdfFontAtlas = await loadSdfFontAtlas()

	return (
		<div className="absolute -inset-64">
			<NameCanvas msdfFontAtlas={msdfFontAtlas} sdfFontAtlas={sdfFontAtlas} />
		</div>
	)
}
