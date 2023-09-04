"use client"

import {Canvas} from "@react-three/fiber"

import type {FontAtlas} from "@/types/FontAtlas"
import type {ReactElement} from "react"

import NamePostprocess from "./NamePostprocess"

export type NameCanvasProps = {
	msdfFontAtlas: FontAtlas
	sdfFontAtlas: FontAtlas
}

export default function NameCanvas({msdfFontAtlas, sdfFontAtlas}: NameCanvasProps): ReactElement | null {
	return (
		<Canvas flat legacy linear gl={{premultipliedAlpha: false}} className="translate-x-[-2%] full:translate-x-0">
			<NamePostprocess msdfFontAtlas={msdfFontAtlas} sdfFontAtlas={sdfFontAtlas} />
		</Canvas>
	)
}
