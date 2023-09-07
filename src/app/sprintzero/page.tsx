import Gallery from "./Gallery"
import {sprintzeroQaTree} from "./sprintzeroQaTree"
import QaTree from "@/components/QaTree"

export default function SprintzeroPage() {
	return (
		<div className="pb-[50%] pt-3">
			<Gallery />

			<div className="mx-auto mt-8 max-w-xl px-3 text-justify font-light leading-snug tracking-wide text-[oklch(97.1%_0.07_110.543)] [&_p:not(.indent-0)]:indent-4">
				<QaTree qaTree={sprintzeroQaTree} />
			</div>
		</div>
	)
}
