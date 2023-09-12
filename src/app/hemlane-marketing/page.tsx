import * as fontkit from "fontkit"
import path from "path"

import HemlaneMarketingGallery from "./Gallery"
import {hemlaneMarketingQaTree} from "./hemlaneMarketingQaTree"
import Parallax from "./Parallax"
import QaTree from "@/components/QaTree"
import "@/helpers/katex.css"

export default async function HemlaneMarketingPage() {
	const font = await fontkit.open(path.resolve(process.cwd(), `public/fonts/Karrik-Regular.woff2`))
	const text = `hemlane marketing`
	const layout = font.layout(text)
	const width = layout.advanceWidth
	const height = font.ascent - font.descent
	const aspectRatio = width / height

	return (
		<>
			<div className="sticky top-0 bg-black">
				<Parallax>
					<div className="mx-3 flex min-h-[80svh] flex-col items-center justify-center gap-4">
						<div className="grid h-auto w-full max-w-2xl justify-items-stretch" style={{aspectRatio}}>
							<div className="max-w-full [container-type:size]">
								<h1 className="font-karrik whitespace-nowrap text-[91cqh] leading-[normal]">{text}</h1>
							</div>
						</div>
						<p className="font-karrik -mt-3 mb-2 max-w-2xl px-1 text-justify text-[min(3vw,1rem)] leading-snug tracking-tight text-[oklch(85%_0.04_110.543)]">
							i worked on a wide variety of things during my time at Hemlane. one of the most memorable contributions i
							made was a marketing page targeted at registered realtors.
						</p>

						<HemlaneMarketingGallery />
					</div>
				</Parallax>
			</div>

			<div className="-mb-12 h-12 w-full bg-black" />

			<div
				className="relative flex w-full rounded-t-lg border-t border-text/20 bg-bg"
				style={{boxShadow: `0px 10px 70px 0px oklch(38.42% 0.04 144.97)`}}
			>
				<div className="mx-auto mt-3 flex max-w-xl flex-col gap-4 px-3 pb-[50%] text-justify font-light leading-snug tracking-wide text-[oklch(97.1%_0.07_110.543)] tablet:mt-6 [&_p:not(.indent-0)]:indent-4">
					<QaTree qaTree={hemlaneMarketingQaTree} />
				</div>
			</div>
		</>
	)
}
