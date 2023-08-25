import type {ReactElement} from "react"

import {loadMsdfFontAtlas, loadSdfFontAtlas} from "./(name-canvas)/loadFontAtlas"
import NameCanvas from "./(name-canvas)/NameCanvas"
import AboutMe from "./AboutMe"
import NavLink from "./NavLink"

export default async function Home(): Promise<ReactElement | null> {
	const msdfFontAtlas = await loadMsdfFontAtlas()
	const sdfFontAtlas = await loadSdfFontAtlas()

	return (
		<div className="m-1.5 grid h-[calc(100%-0.75rem)] grid-cols-[2fr_1fr] overflow-hidden rounded-md bg-[--bg-color]">
			<div className="grid grid-rows-[1fr_auto]">
				<div className="relative isolate w-full">
					<div className="absolute -inset-64">
						<NameCanvas msdfFontAtlas={msdfFontAtlas} sdfFontAtlas={sdfFontAtlas} />
					</div>
				</div>
				<div className="relative isolate mb-16 mt-8 grid grid-cols-[1fr_max-content_2fr_max-content_2fr_max-content_1fr]">
					<div className="absolute top-1/2 h-px w-[calc(100%-1rem)] -translate-y-1/2 border-2 border-dashed border-[--text-color] opacity-40" />
					<div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-[--text-color] opacity-40" />

					<div />
					<NavLink href="/">main page</NavLink>
					<div />
					<NavLink href="/" subtext="PROJECT">
						sprintzero
					</NavLink>
					<div />
					<NavLink href="/" subtext="PROJECT">
						hemlane marketing site
					</NavLink>
					<div />
				</div>
			</div>

			<div className="isolate min-h-0">
				<AboutMe />
			</div>
		</div>
	)
}
