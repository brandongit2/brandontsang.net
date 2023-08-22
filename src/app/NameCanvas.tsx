"use client"

import {Canvas} from "@react-three/fiber"

import type {BMFont} from "@/types/BMFont"
import type {ReactElement} from "react"

import FinalName from "./FinalName"

export type NameCanvasProps = {
	msdfFont: BMFont
	sdfFont: BMFont
}

export default function NameCanvas({msdfFont, sdfFont}: NameCanvasProps): ReactElement | null {
	return (
		<Canvas flat linear gl={{alpha: true, premultipliedAlpha: false}}>
			<FinalName msdfFont={msdfFont} sdfFont={sdfFont} />
		</Canvas>
	)
}
