"use client"

import {OrthographicCamera, useFBO} from "@react-three/drei"
import {createPortal, useFrame, useThree} from "@react-three/fiber"
import {useMemo, type ReactElement, useRef} from "react"
import {Scene} from "three"

import type {FontAtlas} from "@/types/FontAtlas"
import type {Camera} from "three"

import NameComposite from "./NameComposite"
import StaticEffectMaterial from "./StaticEffectMaterial"
import {useScreenToTextSpaceMatrix} from "./transformMatrices"
import bmFontLayout from "@/helpers/bmFontLayout"

const canvasMarginSize = 256

export type FinalNameProps = {
	msdfFontAtlas: FontAtlas
	sdfFontAtlas: FontAtlas
}

export default function FinalName({msdfFontAtlas, sdfFontAtlas}: FinalNameProps): ReactElement | null {
	const gl = useThree((state) => state.gl)
	const {width: canvasWidth, height: canvasHeight} = useThree((state) => state.viewport)

	const fboScene = useMemo(() => new Scene(), [])
	const cam = useRef<Camera>(null)

	const target = useFBO()
	useFrame(() => {
		if (!cam.current) return

		gl.setRenderTarget(target)
		gl.render(fboScene, cam.current)
		gl.setRenderTarget(null)
	})

	const text = `brandon\ntsang`
	const sdfTextLayout = useMemo(() => bmFontLayout(sdfFontAtlas, text), [sdfFontAtlas, text])
	const msdfTextLayout = useMemo(() => {
		const layout = bmFontLayout(msdfFontAtlas, text)
		layout.layout.forEach((char) => {
			char.dstU -= layout.paddingLeft / layout.texelW
			char.dstV -= layout.paddingBottom / layout.texelH

			char.dstU *= layout.texelW / sdfTextLayout.texelW
			char.dstWidth *= layout.texelW / sdfTextLayout.texelW
			char.dstV *= layout.texelH / sdfTextLayout.texelH
			char.dstHeight *= layout.texelH / sdfTextLayout.texelH

			char.dstU += sdfTextLayout.paddingLeft / sdfTextLayout.texelW
			char.dstV += sdfTextLayout.paddingBottom / sdfTextLayout.texelH
		})
		return layout
	}, [
		msdfFontAtlas,
		sdfTextLayout.paddingBottom,
		sdfTextLayout.paddingLeft,
		sdfTextLayout.texelH,
		sdfTextLayout.texelW,
		text,
	])

	const textAspect = sdfTextLayout.texelW / sdfTextLayout.texelH
	const screenToTextSpaceMatrix = useScreenToTextSpaceMatrix(canvasWidth, canvasHeight, textAspect, canvasMarginSize)

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
			{createPortal(
				<NameComposite
					ref={cam}
					sdfFontAtlas={sdfFontAtlas}
					msdfTextLayout={msdfTextLayout}
					sdfTextLayout={sdfTextLayout}
				/>,
				fboScene,
			)}
			<mesh position={[0.5, 0.5, 0]}>
				<planeGeometry />
				<staticEffectMaterial
					key={StaticEffectMaterial.key}
					time={0}
					nameMap={target.texture}
					canvasWidth={canvasWidth}
					canvasHeight={canvasHeight}
					marginSize={canvasMarginSize}
					screenToTextSpaceMatrix={screenToTextSpaceMatrix}
					premultipliedAlpha={false}
				/>
			</mesh>
		</>
	)
}
