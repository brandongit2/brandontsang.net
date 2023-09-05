import clsx from "clsx"
import localFont from "next/font/local"

import type {ReactElement, ReactNode} from "react"

import {loadMsdfFontAtlas, loadSdfFontAtlas} from "./(name-canvas)/loadFontAtlas"
import NameCanvas from "./(name-canvas)/NameCanvas"
import CommonNavSection from "./CommonNavSection"
import "./styles.css"
import TabletNavSection from "./TabletNavSection"

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
								"stage" calc(100dvh - 0.75rem)
								"audience" max-content
								"." 10rem / 100%
							`,
							[`--full-grid` as any]: `
								"stage audience" 1fr
								"nav audience" auto / 1fr 36rem
							`,
						}}
					>
						<div className="relative [grid-area:stage] full:ml-6 full:mt-6">
							<div className="absolute inset-[max(-40vw,-8rem)] z-[-2]">
								<NameCanvas msdfFontAtlas={msdfFontAtlas} sdfFontAtlas={sdfFontAtlas} />
							</div>
							<div className="absolute inset-0 flex justify-center">
								<div className="flex h-full items-center">{stage}</div>
							</div>
						</div>
						<div className="mb-16 mt-8 hidden [grid-area:nav] full:block">
							<CommonNavSection />
						</div>

						<div className="relative grid min-h-0 place-items-center [grid-area:audience]">
							<div>{audience}</div>
						</div>
					</div>

					<div className="pointer-events-none fixed bottom-1.5 w-[calc(100%-0.75rem)] full:hidden">
						<TabletNavSection />
					</div>
				</div>
			</body>
		</html>
	)
}
