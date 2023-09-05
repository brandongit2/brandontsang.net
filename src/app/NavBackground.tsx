import {motion, useMotionTemplate} from "framer-motion"

import type {MotionValue} from "framer-motion"

import {easeInOutQuadInv, easingWithDensity} from "@/helpers/easingWithDensity"

export type NavBackgroundProps = {
	blurFactor: MotionValue<number>
}

export default function NavBackground({blurFactor}: NavBackgroundProps) {
	const numSamples = 8
	const easingSamples = easingWithDensity(numSamples, easeInOutQuadInv)
	const sections = easingSamples.map(({adjustedT: t, y: a}, i) => {
		const blurRadius = a * 5
		const oversizeAmt = `(${blurRadius}px + 10cqh)`
		const nextT = easingSamples[i + 1]?.adjustedT ?? 1

		const top = `(${t * 100}cqh - ${oversizeAmt})`
		const height = `(${(nextT - t) * 100}cqh + ${oversizeAmt})`
		const maskImage = `linear-gradient(
			to top,
			transparent ${blurRadius},
			black calc(${oversizeAmt}),
			black calc(${height} - ${oversizeAmt}),
			transparent calc(${height} - ${blurRadius})
		)`
		const backdropFilter = useMotionTemplate`blur(calc(${blurRadius}px * ${blurFactor}))`

		return {top, height, maskImage, oversizeAmt, backdropFilter}
	})

	return (
		<div className="absolute bottom-0 left-1/2 h-[calc(100%+2rem)] w-[36rem] max-w-[100vw] -translate-x-1/2 [container-type:size]">
			{sections.map(({top, height, maskImage, oversizeAmt, backdropFilter}, i) => (
				<motion.div
					key={i}
					className="absolute left-0 w-full"
					style={{
						top: `calc(${top})`,
						height: `calc(${height} + ${oversizeAmt})`,
						maxHeight: `calc(100cqh - ${top})`,
						backdropFilter,
						WebkitBackdropFilter: backdropFilter,
						maskImage,
						WebkitMaskImage: maskImage,
					}}
				/>
			))}
		</div>
	)
}
