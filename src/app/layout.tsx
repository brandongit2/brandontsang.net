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
				<div className="full:overflow-hidden absolute inset-1.5 overflow-auto rounded-md bg-bg">
					<div
						className="full:[grid-template:--full-grid] full:h-full isolate mx-auto grid h-max max-w-[100rem] [grid-template:--scroll-grid]"
						style={{
							[`--scroll-grid` as any]: `
								"stage" calc(100dvh - 0.75rem - 4.25rem - 2rem)
								"nav" 4.25rem
								"." 2rem
								"audience" auto / 1fr
							`,
							[`--full-grid` as any]: `
								"stage audience" 1fr
								"nav audience" auto / 1fr 36rem
							`,
						}}
					>
						<div className="relative ml-6 mt-6 [grid-area:stage]">
							<div className="absolute -inset-64 z-[-2]">
								<NameCanvas msdfFontAtlas={msdfFontAtlas} sdfFontAtlas={sdfFontAtlas} />
							</div>
							<div className="absolute inset-0">{stage}</div>
						</div>
						<div className="full:mb-16 full:mt-8 full:max-w-none full:grid-cols-[1fr_max-content_2fr_max-content_2fr_max-content_1fr] relative mx-auto grid w-full max-w-4xl grid-cols-[2fr_max-content_2fr_max-content_2fr_max-content_2fr] [grid-area:nav]">
							<div className="full:right-4 absolute right-[-50vw] top-1/2 h-px w-[200vw] -translate-y-1/2 border-2 border-dashed border-text opacity-40" />
							<div className="full:block absolute right-0 top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded bg-text opacity-40" />

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

						<div className="grid min-h-0 items-center [grid-area:audience]">{audience}</div>
					</div>
				</div>
			</body>
		</html>
	)
}
