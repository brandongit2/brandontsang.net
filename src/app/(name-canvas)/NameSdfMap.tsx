"use client"

import {OrthographicCamera} from "@react-three/drei"
import {useLoader} from "@react-three/fiber"
import {forwardRef, useEffect, useMemo, useRef} from "react"
import {
	type OrthographicCamera as OrthographicCameraClass,
	RedFormat,
	FloatType,
	FileLoader,
	LinearFilter,
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
}

const TextLayout = forwardRef<OrthographicCameraClass, TextLayoutProps>(function TextLayoutWithRef(
	{sdfFontAtlas, sdfTextLayout},
	ref,
) {
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

	const sdfMapData = useLoader(FileLoader, `/bmfont/Karrik-Regular-sdf.bin`, (loader) => {
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
		const charDataArray = new Array(layout.length * 8)
		for (let i = 0; i < layout.length; i++) {
			const charData = layout[i]

			const idx = i * 8
			charDataArray[idx] = charData.u
			charDataArray[idx + 1] = charData.v
			charDataArray[idx + 2] = charData.width
			charDataArray[idx + 3] = charData.height
			charDataArray[idx + 4] = charData.dstU
			charDataArray[idx + 5] = charData.dstV
			charDataArray[idx + 6] = charData.dstWidth
			charDataArray[idx + 7] = charData.dstHeight
		}
		return charDataArray
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
					premultipliedAlpha={false}
					ref={sdfMapRef}
				/>
			</mesh>
		</>
	)
})

export default TextLayout
