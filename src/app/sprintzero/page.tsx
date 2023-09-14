import * as fontkit from "fontkit"
import path from "path"

import {sprintzeroQaTree} from "./(qa-tree)/sprintzeroQaTree"
import Gallery from "./Gallery"
import QaTree from "@/components/QaTree"

export default async function SprintzeroPage() {
	const font = await fontkit.open(path.resolve(process.cwd(), `public/fonts/Karrik-Regular.woff2`))
	const text = `sprintzero app`
	const layout = font.layout(text)
	const width = layout.advanceWidth
	const height = font.ascent - font.descent
	const aspectRatio = width / height

	return (
		<div className="mx-3 flex flex-col items-center gap-4">
			<div className="mt-6 grid h-auto w-full max-w-2xl justify-items-stretch" style={{aspectRatio}}>
				<div className="max-w-full [container-type:size]">
					<h1 className="whitespace-nowrap font-karrik text-[91cqh] leading-[normal]">{text}</h1>
				</div>
			</div>
			<p className="-mt-3 mb-2 max-w-2xl px-1 text-justify font-karrik text-[min(3vw,1rem)] leading-snug tracking-tight text-[oklch(85%_0.04_110.543)]">
				this is a brief recount of my work on SprintZero. working on SprintZero was a major milestone in my career, and
				it is the most intimately i&apos;ve ever been involved with a full-production app from start to finish.
			</p>

			<div className="max-w-3xl">
				<Gallery />
			</div>

			<div className="mt-8 max-w-xl pb-[50%] text-justify font-light leading-snug tracking-wide text-[oklch(97.1%_0.07_110.543)] [&_p:not(.indent-0)]:indent-4">
				<QaTree qaTree={sprintzeroQaTree} />
			</div>
		</div>
	)
}
