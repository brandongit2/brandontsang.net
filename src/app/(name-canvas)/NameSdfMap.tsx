"use client"

import {OrthographicCamera} from "@react-three/drei"
import {useLoader, useThree} from "@react-three/fiber"
import {forwardRef, useEffect, useMemo, useRef} from "react"
import {
	NearestFilter,
	type Camera,
	RedFormat,
	FloatType,
	FileLoader,
	LinearFilter,
	type Matrix3,
	type ShaderMaterial,
} from "three"
import {DataTexture} from "three"

import type {FontAtlas} from "@/types/FontAtlas"

import NameSdfMapMaterial from "./NameSdfMapMaterial"
import {TextLayout} from "@/helpers/bmFontLayout"
import {useGlobalStore} from "@/helpers/useGlobalStore"

export type TextLayoutProps = {
	sdfFontAtlas: FontAtlas
	sdfTextLayout: TextLayout
	marginSize: number
	textToScreenSpaceMatrix: Matrix3
}

const TextLayout = forwardRef<Camera, TextLayoutProps>(function TextLayoutWithRef(
	{sdfFontAtlas, sdfTextLayout, marginSize, textToScreenSpaceMatrix},
	ref,
) {
	const {width: canvasWidth, height: canvasHeight} = useThree((state) => state.viewport)
	const transitionProg = useGlobalStore((store) => store.transitionProg)

	const sdfMapRef = useRef<ShaderMaterial | null>(null)
	useEffect(() => {
		if (transitionProg === 0) return

		const unsubscribe = transitionProg.on(`change`, (latest) => {
			if (!sdfMapRef.current) return
			sdfMapRef.current.uniforms.transitionProg.value = latest
		})

		return () => unsubscribe()
	}, [transitionProg])

	const sdfMapData = useLoader(FileLoader, `/Karrik-Regular-sdf.bin`, (loader) => {
		loader.setResponseType(`arraybuffer`)
	})
	const sdfMap = useMemo(() => {
		const texture = new DataTexture(
			new Float32Array(sdfMapData as ArrayBuffer),
			sdfFontAtlas.atlas.width,
			sdfFontAtlas.atlas.height,
			RedFormat,
			FloatType,
			undefined,
			undefined,
			undefined,
			LinearFilter,
			LinearFilter,
		)
		texture.needsUpdate = true
		return texture
	}, [sdfFontAtlas.atlas.height, sdfFontAtlas.atlas.width, sdfMapData])

	const charData = useMemo(() => {
		// Repeating pattern of eight floats.
		// Float 8n:   u
		// Float 8n+1: v
		// Float 8n+2: width
		// Float 8n+3: height
		// Float 8n+4: dstU
		// Float 8n+5: dstV
		// Float 8n+6: dstWidth
		// Float 8n+7: dstHeight
		const {layout} = sdfTextLayout
		const buffer = new Float32Array(layout.length * 8)
		for (let i = 0; i < layout.length; i++) {
			const charData = layout[i]

			const idx = i * 8
			buffer[idx] = charData.u
			buffer[idx + 1] = charData.v
			buffer[idx + 2] = charData.width
			buffer[idx + 3] = charData.height
			buffer[idx + 4] = charData.dstU
			buffer[idx + 5] = charData.dstV
			buffer[idx + 6] = charData.dstWidth
			buffer[idx + 7] = charData.dstHeight
		}
		const charData = new DataTexture(buffer, layout.length * 8, 1, RedFormat, FloatType)
		charData.minFilter = NearestFilter
		charData.magFilter = NearestFilter
		charData.needsUpdate = true
		return charData
	}, [sdfTextLayout])

	return (
		<>
			<OrthographicCamera ref={ref} left={-0.5} right={0.5} top={0.5} bottom={-0.5} position={[0, 0, 5]} />
			<mesh>
				<planeGeometry />
				<nameSdfMapMaterial
					key={NameSdfMapMaterial.key}
					sdfMap={sdfMap}
					charData={charData}
					stringLength={sdfTextLayout.layout.length}
					canvasWidth={canvasWidth}
					canvasHeight={canvasHeight}
					marginSize={marginSize}
					textToScreenSpaceMatrix={textToScreenSpaceMatrix}
					premultipliedAlpha={false}
					ref={sdfMapRef}
				/>
			</mesh>
		</>
	)
})

export default TextLayout
