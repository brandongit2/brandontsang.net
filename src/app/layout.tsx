import clsx from "clsx"
import {Figtree} from "next/font/google"

import type {ReactElement, ReactNode} from "react"

import {loadMsdfFontAtlas, loadSdfFontAtlas} from "./(name-canvas)/loadFontAtlas"
import NameCanvas from "./(name-canvas)/NameCanvas"
import NavLink from "./NavLink"
import "./styles.css"

// eslint-disable-next-line @typescript-eslint/quotes
const figtree = Figtree({subsets: ["latin"]})

type Props = {
	// eslint-disable-next-line react/no-unused-prop-types -- Everything is rendered in the parallel routes instead
	children?: ReactNode
	stage?: ReactNode
	audience?: ReactNode
}

export default async function RootLayout({stage, audience}: Props): Promise<ReactElement | null> {
	const msdfFontAtlas = await loadMsdfFontAtlas()
	const sdfFontAtlas = await loadSdfFontAtlas()

	return (
		<html lang="en" className={clsx(figtree.className, `h-full`)}>
			<body className="grid h-full overflow-hidden bg-text text-text">
				<div className="absolute inset-1.5 overflow-hidden rounded-md bg-bg">
					<div className="isolate mx-auto grid h-full max-w-[100rem] grid-cols-[1fr_36rem]">
						<div className="grid grid-rows-[1fr_auto]">
							<div className="relative ml-6 mt-6">
								<div className="absolute -inset-64 z-[-2]">
									<NameCanvas msdfFontAtlas={msdfFontAtlas} sdfFontAtlas={sdfFontAtlas} />
								</div>
								<div className="absolute inset-0">{stage}</div>
							</div>
							<div className="relative mb-16 mt-8 grid grid-cols-[1fr_max-content_2fr_max-content_2fr_max-content_1fr]">
								<div className="absolute right-4 top-1/2 h-px w-[100vw] -translate-y-1/2 border-2 border-dashed border-text opacity-40" />
								<div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-text opacity-40" />

								<div />
								<NavLink href="/">main page</NavLink>
								<div />
								<NavLink href="/sprintzero" subtext="PROJECT">
									sprintzero
								</NavLink>
								<div />
								<NavLink href="/" subtext="PROJECT">
									hemlane marketing site
								</NavLink>
								<div />
							</div>
						</div>

						<div className="grid min-h-0 items-center">{audience}</div>
					</div>
				</div>
			</body>
		</html>
	)
}
