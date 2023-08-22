"use client"

import {OrthographicCamera, useFBO} from "@react-three/drei"
import {createPortal, useFrame, useThree} from "@react-three/fiber"
import {useMemo, type ReactElement, useRef} from "react"
import {Scene} from "three"

import type {BMFont} from "@/types/BMFont"
import type {Camera} from "three"

import NameComposite from "./NameComposite"
import StaticEffectMaterial from "./StaticEffectMaterial"

export type FinalNameProps = {
	msdfFont: BMFont
	sdfFont: BMFont
}

export default function FinalName({msdfFont, sdfFont}: FinalNameProps): ReactElement | null {
	const gl = useThree((state) => state.gl)

	const fboScene = useMemo(() => {
		const scene = new Scene()
		return scene
	}, [])
	const cam = useRef<Camera>(null)

	const target = useFBO()
	useFrame(() => {
		if (!cam.current) return

		gl.setRenderTarget(target)
		gl.render(fboScene, cam.current)
		gl.setRenderTarget(null)
	})

	return (
		<>
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
			{createPortal(<NameComposite ref={cam} msdfFont={msdfFont} sdfFont={sdfFont} />, fboScene)}
			<mesh position={[0.5, 0.5, 0]}>
				<planeGeometry />
				<staticEffectMaterial key={StaticEffectMaterial.key} time={0} nameMap={target.texture} />
			</mesh>
		</>
	)
}
