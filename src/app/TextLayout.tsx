import {OrthographicCamera, useTexture} from "@react-three/drei"
import {forwardRef} from "react"
import {NearestFilter, type Camera, RedFormat, FloatType, ClampToEdgeWrapping} from "three"
import {DataTexture, Vector3} from "three"

import TextLayoutMaterial from "./TextLayoutMaterial"
import {TextLayout} from "@/helpers/bmFontLayout"

export type TextLayoutProps = {
	textLayout: TextLayout
}

const TextLayout = forwardRef<Camera, TextLayoutProps>(function TextLayoutWithRef({textLayout}, ref) {
	const sdfMap = useTexture(`/Righteous-Regular-sdf.png`)
	sdfMap.generateMipmaps = false
	sdfMap.minFilter = NearestFilter
	sdfMap.wrapS = sdfMap.wrapT = ClampToEdgeWrapping

	// Repeating pattern of eight floats.
	// Float 8n:   u
	// Float 8n+1: v
	// Float 8n+2: width
	// Float 8n+3: height
	// Float 8n+4: dstU
	// Float 8n+5: dstV
	// Float 8n+6: dstWidth
	// Float 8n+7: dstHeight
	const {layout} = textLayout
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

	return (
		<>
			<OrthographicCamera ref={ref} left={-0.5} right={0.5} top={0.5} bottom={-0.5} position={new Vector3(0, 0, 5)} />
			<mesh>
				<planeGeometry />
				<textLayoutMaterial
					key={TextLayoutMaterial.key}
					sdfMap={sdfMap}
					charData={charData}
					stringLength={layout.length}
				/>
			</mesh>
		</>
	)
})

export default TextLayout
