import clsx from "clsx"
import localFont from "next/font/local"

import type {ReactElement, ReactNode} from "react"

import {loadMsdfFontAtlas, loadSdfFontAtlas} from "./(name-canvas)/loadFontAtlas"
import NameCanvas from "./(name-canvas)/NameCanvas"
import NavBackground from "./NavBackground"
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
				<div className="absolute inset-1.5 overflow-y-auto rounded-md bg-bg full:overflow-y-hidden">
					<div
						className="isolate mx-auto grid max-w-[100rem] [grid-template:--scroll-grid] full:h-full full:[grid-template:--full-grid]"
						style={{
							[`--scroll-grid` as any]: `
								"stage" 100dvh
								"audience" max-content / 100%
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

						<div className="relative grid min-h-0 items-center [grid-area:audience]">
							{audience}
							<div className="pointer-events-none absolute inset-0 top-0 isolate flex items-end full:hidden">
								<NavBackground>{audience}</NavBackground>
								<div className="pointer-events-auto sticky bottom-0 w-full">
									<div
										className="mx-auto mt-24 w-full max-w-4xl py-8"
										style={{
											backgroundImage: `linear-gradient(to bottom, transparent 30%, oklch(38.42% 0.085 144.97) calc(100% - 15px))`,
										}}
									>
										<NavSection />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	)
}
