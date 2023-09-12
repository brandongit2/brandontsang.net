"use client"

import {motion, useScroll, useTransform} from "framer-motion"

import type {ReactNode} from "react"

export type ParallaxProps = {
	children: ReactNode
}

export default function Parallax({children}: ParallaxProps) {
	const {scrollY} = useScroll()

	return (
		<motion.div
			style={{
				y: useTransform(scrollY, [0, 100, 200, 275, 331, 373], [0, 0, -10, -20, -30, -40], {clamp: false}),
				opacity: useTransform(scrollY, [0, 100, 200, 275, 331, 373], [1, 1, 0.96, 0.9, 0.85, 0.8], {clamp: false}),
			}}
		>
			{children}
		</motion.div>
	)
}
