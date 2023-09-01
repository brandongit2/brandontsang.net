"use client"

import {Canvas} from "@react-three/fiber"

import type {FontAtlas} from "@/types/FontAtlas"
import type {ReactElement} from "react"

import FinalName from "./FinalName"

export type NameCanvasProps = {
	msdfFontAtlas: FontAtlas
	sdfFontAtlas: FontAtlas
}

export default function NameCanvas({msdfFontAtlas, sdfFontAtlas}: NameCanvasProps): ReactElement | null {
	return (
		<Canvas flat legacy linear gl={{premultipliedAlpha: false}} className="full:translate-x-0 translate-x-[-2%]">
			<FinalName msdfFontAtlas={msdfFontAtlas} sdfFontAtlas={sdfFontAtlas} />
		</Canvas>
	)
}
