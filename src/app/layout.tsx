import clsx from "clsx"
import localFont from "next/font/local"

import type {ReactElement, ReactNode} from "react"

import {loadMsdfFontAtlas, loadSdfFontAtlas} from "./(name-canvas)/loadFontAtlas"
import NameCanvas from "./(name-canvas)/NameCanvas"
import NavSection from "./NavSection"
import "./styles.css"
import {easeInOutQuadInv, easingWithDensity} from "@/helpers/easingWithDensity"

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
				<div className="absolute inset-1.5 overflow-y-auto overflow-x-hidden rounded-md bg-bg full:overflow-y-hidden">
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
								<div className="pointer-events-auto sticky bottom-0 w-full">
									<div className="absolute left-1/2 top-0 h-full w-[36rem] max-w-[100vw] -translate-x-1/2 [contain:content] [container-type:size]">
										{(() => {
											const easingSamples = easingWithDensity(8, easeInOutQuadInv)
											return easingSamples.map(({adjustedT: t, y: a}, i) => {
												const blurRadius = `${a * 5}px`
												const oversizeAmt = `(${blurRadius} + 10cqh)`
												const nextT = easingSamples[i + 1]?.adjustedT ?? 1
												const blurRect = (
													<div
														key={i}
														className="contain absolute left-0 w-full"
														style={{
															top: `calc(${t * 100}cqh - ${oversizeAmt})`,
															height: `calc(${(nextT - t) * 100}cqh + 2 * ${oversizeAmt})`,
															backdropFilter: `blur(${blurRadius})`,
															WebkitBackdropFilter: `blur(${blurRadius})`,
															maskImage: `linear-gradient(to top, transparent ${blurRadius}, black calc(${oversizeAmt}), black calc(100% - ${oversizeAmt}), transparent calc(100% - ${blurRadius}))`,
															WebkitMaskImage: `linear-gradient(to top, transparent ${blurRadius}, black calc(${oversizeAmt}), black calc(100% - ${oversizeAmt}), transparent calc(100% - ${blurRadius}))`,
														}}
													/>
												)
												return blurRect
											})
										})()}
									</div>

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
