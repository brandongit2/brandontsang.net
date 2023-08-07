import {OrthographicCamera, useTexture} from "@react-three/drei"
import {forwardRef} from "react"
import {NearestFilter, type Camera, RedFormat, FloatType, ClampToEdgeWrapping} from "three"
import {DataTexture, Vector3} from "three"

import type {BMFont} from "@/types/BMFont"

import SdfStringBuilderMaterial from "./SdfStringBuilderMaterial"
import bmFontLayout from "@/helpers/bmFontLayout"

export type SdfSceneProps = {
	font: BMFont[`font`]
	text: string
}

const SdfScene = forwardRef<Camera, SdfSceneProps>(function SdfSceneWithRef({font, text}, ref) {
	const sdfMap = useTexture(`/Righteous-Regular-sdf.png`)
	sdfMap.generateMipmaps = false
	sdfMap.minFilter = NearestFilter
	sdfMap.wrapS = sdfMap.wrapT = ClampToEdgeWrapping

	// Repeating pattern of six floats.
	// Float 6n:   u
	// Float 6n+1: v
	// Float 6n+2: width
	// Float 6n+3: height
	// Float 6n+4: dstU
	// Float 6n+5: dstV
	const buffer = new Float32Array(Object.keys(font.chars.char).length * 6)
	const strLayout = bmFontLayout(font, text)
	for (let i = 0; i < strLayout.length; i++) {
		const charData = strLayout[i]

		const idx = i * 6
		buffer[idx] = charData.u
		buffer[idx + 1] = charData.v
		buffer[idx + 2] = charData.width
		buffer[idx + 3] = charData.height
		buffer[idx + 4] = charData.dstU
		buffer[idx + 5] = charData.dstV
	}
	const charData = new DataTexture(buffer, Object.keys(font.chars.char).length * 6, 1, RedFormat, FloatType)
	charData.minFilter = NearestFilter
	charData.magFilter = NearestFilter
	charData.needsUpdate = true

	const stringIds = text.split(``).map((char) => font.chars.char.findIndex((c) => c.id === char.codePointAt(0)))

	return (
		<>
			<OrthographicCamera ref={ref} left={-0.5} right={0.5} top={0.5} bottom={-0.5} position={new Vector3(0, 0, 5)} />
			<mesh>
				<planeGeometry />
				<sdfStringBuilderMaterial
					key={SdfStringBuilderMaterial.key}
					sdfMap={sdfMap}
					sdfMapDimensions={[512, 512]}
					charData={charData}
					string={stringIds}
				/>
			</mesh>
		</>
	)
})

export default SdfScene
