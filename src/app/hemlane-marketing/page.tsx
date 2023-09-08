import clsx from "clsx"
import * as fontkit from "fontkit"
import path from "path"

import HemlaneMarketingGallery from "./Gallery"
import {hemlaneMarketingQaTree} from "./hemlaneMarketingQaTree"
import QaTree from "@/components/QaTree"
import {karrik} from "@/helpers/fonts"

export default async function HemlaneMarketingPage() {
	const font = await fontkit.open(path.resolve(process.cwd(), `public/fonts/Karrik-Regular.woff2`))
	const text = `hemlane marketing page`
	const layout = font.layout(text)
	const width = layout.advanceWidth
	const height = font.ascent - font.descent
	const aspectRatio = width / height

	return (
		<div className="mx-3 flex flex-col items-center gap-4">
			<div className="mt-6 grid h-auto w-full max-w-xl justify-items-stretch" style={{aspectRatio}}>
				<div className="max-w-full [container-type:size]">
					<h1 className={clsx(karrik.className, `whitespace-nowrap text-[91cqh] leading-[normal]`)}>{text}</h1>
				</div>
			</div>
			<p className="-mt-3 mb-4 max-w-xl px-8 text-justify font-medium leading-snug text-[oklch(97.1%_0.07_110.543)] opacity-90">
				i worked on a large variety of things during my time at Hemlane. one of the most memorable contributions i made
				was a marketing page targeted at registered realtors.{` `}
				<span className="opacity-30">(the content on this page is not yet complete; sorry)</span>
			</p>
			<div className="max-w-3xl">
				<HemlaneMarketingGallery />
			</div>
			<div className="flex max-w-xl flex-col gap-4 pb-[50%] text-justify font-light leading-snug tracking-wide text-[oklch(97.1%_0.07_110.543)] [&_p:not(.indent-0)]:indent-4">
				<QaTree qaTree={hemlaneMarketingQaTree} />
			</div>
		</div>
	)
}
