"use client"

import {motion, useScroll, useTransform} from "framer-motion"
import {lazy} from "react"

import type {FontAtlas} from "@/types/FontAtlas"

const NameCanvas = lazy(() => import(`./(name-canvas)/NameCanvas`))

export type NameParallaxProps = {
	sdfFontAtlas: FontAtlas
	msdfFontAtlas: FontAtlas
}

export default function NameParallax({sdfFontAtlas, msdfFontAtlas}: NameParallaxProps) {
	const {scrollY} = useScroll()

	return (
		<motion.div
			className="relative isolate -z-10 mx-12 flex h-[75svh] items-center self-stretch [container-type:inline-size]"
			style={{
				y: useTransform(scrollY, [0, 600], [0, 250], {clamp: false}),
				opacity: useTransform(scrollY, (y) =>
					typeof window === `undefined` ? 1 : Math.min(Math.max(1 - ((3 * y) / window.innerHeight - 0.6), 0.1), 1),
				),
			}}
		>
			<div className="relative h-max w-[100cqw] [@media(min-width:870px)]:translate-x-[-4%]">
				<NameCanvas sdfFontAtlas={sdfFontAtlas} msdfFontAtlas={msdfFontAtlas} />
			</div>
		</motion.div>
	)
}
