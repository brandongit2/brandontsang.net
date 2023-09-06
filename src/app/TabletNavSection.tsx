"use client"

import {motion, useMotionTemplate, useScroll, useTransform} from "framer-motion"
import {useEffect, useMemo, useRef} from "react"

import TabletAndFullNavSection from "./TabletAndFullNavSection"
import {easeInOutQuadInv, easingWithDensity} from "@/helpers/easingWithDensity"

const easeInOutQuad = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)

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

	const sections = useMemo(() => {
		const easingSamples = easingWithDensity(6, easeInOutQuadInv)
		const easeDistance = 0.6 // From top, out of 1, how far down the blur easing should go until hitting max blur
		const sections = easingSamples.slice(0, -1).map(({adjustedT, y: a}, i) => {
			const prevT = (easingSamples[i - 1]?.adjustedT ?? 0) * easeDistance
			const t1 = adjustedT * easeDistance
			const t2 = (easingSamples[i + 1]?.adjustedT ?? 1) * easeDistance
			const nextT = (easingSamples[i + 2]?.adjustedT ?? 1) * easeDistance

			const blurRadius = a * 4
			const plainHeight = (t2 - t1) * 100
			const extraHeightTop = ((t1 - prevT) / 2) * 100
			const extraHeightBottom = ((nextT - t2) / 2) * 100
			const top = t1 * 100 - extraHeightTop

			const gradientSamplesPerSide = 4
			const gradientPortionTop = Array.from({length: gradientSamplesPerSide}, (_, i) => {
				const t = i / (gradientSamplesPerSide - 1)
				let o = easeInOutQuad(t)
				const dist = t * extraHeightTop
				return `oklch(0 0 0 / ${o}) ${dist}cqh`
			}).join(`,`)
			const gradientPortionBottom = Array.from({length: gradientSamplesPerSide}, (_, i) => {
				const t = i / (gradientSamplesPerSide - 1)
				const o = easeInOutQuad(t)
				const dist = extraHeightTop + plainHeight + t * extraHeightBottom
				return `oklch(0 0 0 / ${1 - o}) ${dist}cqh`
			}).join(`,`)

			const isLastSegment = i === easingSamples.length - 2
			return {
				height: isLastSegment ? `100cqh` : `calc(${plainHeight}cqh + ${extraHeightTop}cqh + ${extraHeightBottom}cqh)`,
				top: `${top}cqh`,
				maskImage: isLastSegment
					? `linear-gradient(to bottom,${gradientPortionTop})`
					: `linear-gradient(to bottom,${gradientPortionTop},${gradientPortionBottom})`,
				blurRadius,
				navOpacity,
			}
		})

		return sections
	}, [navOpacity])

	return (
		<div className="w-full" ref={targetRef}>
			<div className="absolute bottom-0 left-1/2 h-[calc(100%+2rem)] w-[36rem] max-w-full -translate-x-1/2 [container-type:size]">
				{sections.map(({top, height, maskImage, blurRadius, navOpacity}, i) => {
					const backdropFilter = useMotionTemplate`blur(calc(${blurRadius}px * ${navOpacity}))`
					return (
						<motion.div
							key={i}
							className="absolute left-0 w-full"
							style={{
								top,
								height,
								maxHeight: `calc(100cqh - ${top})`,
								backdropFilter,
								WebkitBackdropFilter: backdropFilter,
								maskImage,
								WebkitMaskImage: maskImage,
							}}
						/>
					)
				})}
			</div>

			<motion.div
				className="absolute h-full w-full"
				style={{
					backgroundImage: `linear-gradient(to bottom, transparent 30%, oklch(38.42% 0.085 144.97) calc(100% - 15px))`,
					opacity: navOpacity,
				}}
			/>

			<motion.div className="py-8" style={{opacity: navOpacity}}>
				<TabletAndFullNavSection />
			</motion.div>
		</div>
	)
}
