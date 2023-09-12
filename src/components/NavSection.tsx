"use client"

import clsx from "clsx"
import {motion, useMotionTemplate, useScroll, useTransform} from "framer-motion"
import {useCallback, useEffect, useMemo, useRef, useState} from "react"

import NavLink from "./NavLink"
import {easeInOutQuadInv, easingWithDensity} from "@/helpers/easingWithDensity"

const easeInOutQuad = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)

export default function NavSection() {
	const scrollerRef = useRef<HTMLDivElement | null>(null)
	const targetRef = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		scrollerRef.current = document.querySelector(`#scroller`)
	})
	const {scrollY} = useScroll({
		container: scrollerRef,
		layoutEffect: false,
	})
	const navOpacity = useTransform(scrollY, (y) =>
		typeof window === `undefined` ? 0 : Math.min(Math.max((5 * y) / window.innerHeight - 0.1, 0), 1),
	)

	const sections = useMemo(() => {
		const easingSamples = easingWithDensity(6, easeInOutQuadInv)
		const easeDistance = 1 // From top, out of 1, how far down the blur easing should go until hitting max blur
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

	const getIsPointable = useCallback(() => navOpacity.get() > 0.1, [navOpacity])
	const [isPointable, setIsPointable] = useState(getIsPointable())
	useEffect(() => navOpacity.on(`change`, () => setIsPointable(getIsPointable())), [getIsPointable, navOpacity])

	return (
		<div className={clsx(`w-full`, isPointable ? `pointer-events-auto` : `pointer-events-none`)} ref={targetRef}>
			<div className="pointer-events-none absolute bottom-0 left-1/2 h-[calc(100%+2rem)] w-[36rem] max-w-full -translate-x-1/2 [container-type:size]">
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
				className="pointer-events-none absolute h-full w-full"
				style={{
					backgroundImage: `linear-gradient(to bottom, transparent 30%, oklch(38.42% 0.085 144.97) calc(100% - 15px))`,
					opacity: navOpacity,
				}}
			/>

			<motion.div className="relative mx-auto w-full max-w-4xl" style={{opacity: navOpacity}}>
				<div className="absolute right-full top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-text opacity-40" />
				<div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 border-2 border-dashed border-text opacity-40" />
				<div className="absolute left-full top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-text opacity-40" />

				<div className="w-full overflow-x-auto py-4 tablet:py-8">
					<div className="mx-auto grid w-full grid-cols-[var(--space)_max-content_var(--space)_max-content_var(--space)_max-content_var(--space)] [--space:minmax(1rem,1fr)]">
						<div />
						<NavLink href="/" zIndex={3}>
							main page
						</NavLink>
						<div />
						<NavLink href="/sprintzero" subtext="PROJECT" zIndex={4}>
							sprintzero
						</NavLink>
						<div />
						<NavLink href="/hemlane-marketing" subtext="WEBPAGE" zIndex={5}>
							hemlane marketing
						</NavLink>
						<div />
					</div>
				</div>
			</motion.div>
		</div>
	)
}
