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

			<div className="relative mx-auto max-w-xl px-3 pb-[50%] text-[oklch(97.1%_0.07_110.543)]">
				<QaWrapper />

				<div className="absolute bottom-40 left-0 mt-12 w-full text-xs opacity-40">
					<p>
						This website is a WORK-IN-PROGRESS! You can see the source{` `}
						<a
							href="https://github.com/brandongit2/brandontsang.net"
							target="_blank"
							rel="noreferrer"
							className="underline"
						>
							here
						</a>
						.
					</p>
					<p>
						Made by Brandon Tsang, Sep 2023.
						{` `}
						<span className="inline-block w-1" />
						🌇
					</p>
				</div>
			</div>
		</div>
	)
}
