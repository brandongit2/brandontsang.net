"use client"

import {Canvas} from "@react-three/fiber"

import type {BMFont} from "@/types/BMFont"
import type {ReactElement} from "react"

import FinalName from "./FinalName"

export type NameCanvasProps = {
	font: BMFont["font"]
}

export default function NameCanvas({font}: NameCanvasProps): ReactElement | null {
	return (
		<Canvas flat linear gl={{alpha: true, premultipliedAlpha: false}}>
			<FinalName font={font} />
		</Canvas>
	)
}
