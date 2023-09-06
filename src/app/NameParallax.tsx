"use client"

import {motion, useScroll, useTransform} from "framer-motion"

import type {FontAtlas} from "@/types/FontAtlas"

import NameCanvas from "./(name-canvas)/NameCanvas"

export type NameParallaxProps = {
	sdfFontAtlas: FontAtlas
	msdfFontAtlas: FontAtlas
}

export default function NameParallax({sdfFontAtlas, msdfFontAtlas}: NameParallaxProps) {
	const {scrollY} = useScroll()

	return (
		<motion.div
			className="relative mx-12 flex h-[70dvh] items-center self-stretch [container-type:inline-size]"
			style={{
				y: useTransform(scrollY, [0, 600], [0, 250], {clamp: false}),
				opacity: useTransform(scrollY, [300, 600], [1, 0.1]),
			}}
		>
			<div className="relative h-max w-[100cqw] [@media(min-width:870px)]:translate-x-[-4%]">
				<NameCanvas sdfFontAtlas={sdfFontAtlas} msdfFontAtlas={msdfFontAtlas} />
			</div>
		</motion.div>
	)
}
