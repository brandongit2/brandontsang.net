"use client"

import {motion, useScroll, useTransform} from "framer-motion"
import {useEffect, useRef} from "react"

import NavBackground from "./NavBackground"
import NavLink from "./NavLink"

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
	const opacityNav = useTransform(scrollY, (y) => Math.min(Math.max((y - 200) / 30, 0), 1))

	return (
		<div className="pointer-events-none fixed bottom-1.5 w-full full:hidden" ref={targetRef}>
			<NavBackground blurFactor={opacityNav} />

			<motion.div
				className="absolute h-full w-full"
				style={{
					backgroundImage: `linear-gradient(to bottom, transparent 30%, oklch(38.42% 0.085 144.97) calc(100% - 15px))`,
					opacity: opacityNav,
				}}
			/>

			<motion.div
				className="mx-auto w-full max-w-4xl py-8"
				style={{
					opacity: opacityNav,
				}}
			>
				<div className="relative grid grid-cols-[2fr_max-content_2fr_max-content_2fr_max-content_2fr] full:grid-cols-[1fr_max-content_2fr_max-content_2fr_max-content_1fr]">
					<div className="absolute right-[-50vw] top-1/2 h-px w-[200vw] -translate-y-1/2 border-2 border-dashed border-text opacity-40 full:right-4" />
					<div className="absolute right-0 top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded bg-text opacity-40 full:block" />

					<div />
					<NavLink href="/">main page</NavLink>
					<div />
					<NavLink href="/sprintzero" subtext="PROJECT">
						sprintzero
					</NavLink>
					<div />
					<NavLink href="/" subtext="PROJECT">
						hemlane marketing site
					</NavLink>
					<div />
				</div>
			</motion.div>
		</div>
	)
}
