import clsx from "clsx"
import * as fontkit from "fontkit"
import path from "path"

import Gallery from "./Gallery"
import {sprintzeroQaTree} from "./sprintzeroQaTree"
import QaTree from "@/components/QaTree"
import {karrik} from "@/helpers/fonts"

export default async function SprintzeroPage() {
	const font = await fontkit.open(path.resolve(process.cwd(), `public/fonts/Karrik-Regular.woff2`))
	const text = `sprintzero - project retrospective`
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
			<p className="-mt-3 mb-4 flex max-w-xl flex-col gap-4 px-8 text-justify font-medium leading-snug text-[oklch(97.1%_0.07_110.543)] opacity-70">
				this is a brief recount and analysis of my work on SprintZero. working on SprintZero was a milestone in my
				career, and it is the first full-production app i&apos;ve ever built, start-to-finish.
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
