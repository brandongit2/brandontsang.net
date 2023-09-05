"use client"

import {motion, useMotionTemplate, useScroll, useTransform} from "framer-motion"
import {useEffect, useRef} from "react"

import CommonNavSection from "./CommonNavSection"
import {easeInOutQuadInv, easingWithDensity} from "@/helpers/easingWithDensity"

export default function TabletNavSection() {
	const scrollerRef = useRef<HTMLDivElement | null>(null)
	const targetRef = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		scrollerRef.current = document.querySelector(`#scroller`)
	})
	const {scrollY} = useScroll({
		container: scrollerRef,
		layoutEffect: false,
	})
	const navOpacity = useTransform(scrollY, (y) => Math.min(Math.max((y - 200) / 70, 0), 1))

	const easingSamples = easingWithDensity(8, easeInOutQuadInv)
	const sections = easingSamples.map(({adjustedT: t, y: a}, i) => {
		const nextT = easingSamples[i + 1]?.adjustedT ?? 1

		const blurRadius = a * 5
		const oversizeAmt = `calc(${blurRadius}px + 5cqh)`
		const plainHeight = `${(nextT - t) * 100}cqh`

		return {
			plainHeight,
			oversizeAmt,
			top: `${t * 100}cqh`,
			maskImage: `linear-gradient(
				to bottom,
				transparent 0cqh,
				black ${oversizeAmt},
				black calc(${plainHeight} + ${oversizeAmt}),
				transparent calc(${plainHeight} + 2 * ${oversizeAmt})
			)`,
			backdropFilter: useMotionTemplate`blur(calc(${blurRadius}px * ${navOpacity}))`,
		}
	})

	return (
		<div className="w-full" ref={targetRef}>
			<div className="absolute bottom-0 left-1/2 h-[calc(100%+2rem)] w-[36rem] max-w-full -translate-x-1/2 [container-type:size]">
				{sections.map(({top, plainHeight, maskImage, oversizeAmt, backdropFilter}, i) => (
					<motion.div
						key={i}
						className="absolute left-0 w-full"
						style={{
							top: `calc(${top} - ${oversizeAmt})`,
							height: `calc(${plainHeight} + 2 * ${oversizeAmt})`,
							maxHeight: `calc(100cqh - ${top} + ${oversizeAmt})`,
							backdropFilter,
							WebkitBackdropFilter: backdropFilter,
							maskImage,
							WebkitMaskImage: maskImage,
						}}
					/>
				))}
			</div>

			<motion.div
				className="absolute h-full w-full"
				style={{
					backgroundImage: `linear-gradient(to bottom, transparent 30%, oklch(38.42% 0.085 144.97) calc(100% - 15px))`,
					opacity: navOpacity,
				}}
			/>

			<motion.div className="py-8" style={{opacity: navOpacity}}>
				<CommonNavSection />
			</motion.div>
		</div>
	)
}
