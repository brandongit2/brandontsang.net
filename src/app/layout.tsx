import clsx from "clsx"
import localFont from "next/font/local"

import type {ReactElement, ReactNode} from "react"

import {loadMsdfFontAtlas, loadSdfFontAtlas} from "./(name-canvas)/loadFontAtlas"
import NameCanvas from "./(name-canvas)/NameCanvas"
import NavSection from "./NavSection"
import "./styles.css"

/* eslint-disable @typescript-eslint/quotes */
const figtree = localFont({
	src: [
		{
			path: "../../public/Figtree-Variable.woff2",
			style: "normal",
		},
		{
			path: "../../public/Figtree-Italic-Variable.woff2",
			style: "italic",
		},
	],
})
/* eslint-enable @typescript-eslint/quotes */

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
				<div
					id="scroller"
					className="absolute inset-1.5 overflow-y-auto overflow-x-hidden rounded-md bg-bg full:overflow-y-hidden"
				>
					<div
						className="isolate mx-auto grid max-w-[100rem] [grid-template:--scroll-grid] full:h-full full:[grid-template:--full-grid]"
						style={{
							[`--scroll-grid` as any]: `
								"stage" 100dvh
								"audience" max-content
								"." 7rem / 100%
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
						<div className="mb-16 mt-8 hidden [grid-area:nav] full:block">
							<NavSection />
						</div>

						<div className="relative grid min-h-0 items-center [grid-area:audience]">{audience}</div>
					</div>

					<NavSection />
				</div>
			</body>
		</html>
	)
}
