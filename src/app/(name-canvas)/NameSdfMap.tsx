import {OrthographicCamera, useFBO} from "@react-three/drei"
import {createPortal, useThree} from "@react-three/fiber"
import {useEffect, useMemo, useRef} from "react"
import {Scene, FloatType, RedFormat} from "three"

import type {TextLayout as NameSdfMap} from "@/helpers/bmFontLayout"
import type {ReactNode} from "react"
import type {Texture, OrthographicCamera as OrthographicCameraClass} from "three"

import NameSdfMapMaterial from "./NameSdfMapMaterial"
import UnpackSdf from "./UnpackSdf"

export type NameSdfMapProps = {
	sdfTextLayout: NameSdfMap
	render: (texture: Texture) => ReactNode
}

export default function NameSdfMap({sdfTextLayout, render}: NameSdfMapProps) {
	const gl = useThree((state) => state.gl)
	const viewport = useThree((state) => state.viewport)
	const fboScene = useMemo(() => new Scene(), [])
	const camRef = useRef<OrthographicCameraClass>(null)
	const target = useFBO({type: FloatType, format: RedFormat})
	useEffect(() => {
		if (!camRef.current) return

		gl.setRenderTarget(target)
		gl.render(fboScene, camRef.current)
		gl.setRenderTarget(null)
	}, [fboScene, gl, target, viewport.width, viewport.height])

	const charData = useMemo(() => {
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
			{createPortal(
				<>
					<OrthographicCamera ref={camRef} left={-0.5} right={0.5} top={0.5} bottom={-0.5} position={[0, 0, 5]} />
					<mesh>
						<planeGeometry />
						<UnpackSdf
							render={(texture) => (
								<nameSdfMapMaterial
									key={NameSdfMapMaterial.key}
									sdfMap={texture}
									charData={charData}
									stringLength={sdfTextLayout.layout.length}
									premultipliedAlpha={false}
								/>
							)}
						/>
					</mesh>
				</>,
				fboScene,
			)}
			{render(target.texture)}
		</>
	)
}
