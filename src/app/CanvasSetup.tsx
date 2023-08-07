"use client"

import {OrthographicCamera} from "@react-three/drei"
import {extend} from "@react-three/fiber"

import type {ReactElement} from "react"

import NameMaterial from "./NameMaterial"
import SdfStringBuilderMaterial from "./SdfStringBuilderMaterial"

extend({FancyMaterial: NameMaterial, SdfStringBuilderMaterial})

export default function CanvasSetup(): ReactElement | null {
	return (
		<OrthographicCamera
			makeDefault
			manual
			left={0}
			right={1}
			top={1}
			bottom={0}
			near={-50}
			far={50}
			position={[0, 0, 5]}
		/>
	)
}
