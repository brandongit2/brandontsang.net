import type {ReactElement} from "react"

import {loadMsdfFontAtlas, loadSdfFontAtlas} from "./(name-canvas)/loadFontAtlas"
import NameCanvas from "./(name-canvas)/NameCanvas"
import {rootQaTree} from "./rootQaTree"
import QaTree from "@/components/QaTree"

export default async function Home(): Promise<ReactElement | null> {
	const sdfFontAtlas = await loadSdfFontAtlas()
	const msdfFontAtlas = await loadMsdfFontAtlas()

	return (
		<div className="mx-auto flex max-w-2xl flex-col">
			<div className="relative mx-12 flex h-[70dvh] items-center self-stretch [container-type:inline-size]">
				<div className="relative h-max w-[100cqw] [@media(min-width:870px)]:translate-x-[-4%]">
					<NameCanvas sdfFontAtlas={sdfFontAtlas} msdfFontAtlas={msdfFontAtlas} />
				</div>
			</div>

			<div className="mx-auto max-w-xl pb-[50%] text-justify font-extralight leading-snug tracking-wide text-[oklch(97.1%_0.07_110.543)] [&_p]:indent-8">
				<QaTree qaTree={rootQaTree} />
			</div>
		</div>
	)
}
