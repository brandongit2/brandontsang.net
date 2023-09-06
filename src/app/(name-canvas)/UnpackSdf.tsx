import {OrthographicCamera, useFBO, useTexture} from "@react-three/drei"
import {createPortal, useThree} from "@react-three/fiber"
import {useEffect, useMemo, useRef} from "react"
import {ClampToEdgeWrapping, NearestFilter, RedFormat, Scene} from "three"

import type {ReactNode} from "react"
import type {Texture, OrthographicCamera as OrthographicCameraClass} from "three"

import UnpackSdfMaterial from "./UnpackSdfMaterial"

export type UnpackSdfProps = {
	render: (texture: Texture) => ReactNode
}

export default function UnpackSdf({render}: UnpackSdfProps) {
	const gl = useThree((state) => state.gl)
	const fboScene = useMemo(() => new Scene(), [])
	const cam = useRef<OrthographicCameraClass>(null)
	const target = useFBO(1096, 1096, {format: RedFormat})
	useEffect(() => {
		if (!cam.current) return

		gl.setRenderTarget(target)
		gl.render(fboScene, cam.current)
		gl.setRenderTarget(null)
	}, [fboScene, gl, target])

	const sdfMap = useTexture(`/fonts/sdfs/Karrik-Regular-sdf.png`)
	sdfMap.generateMipmaps = false
	sdfMap.minFilter = NearestFilter
	sdfMap.wrapS = sdfMap.wrapT = ClampToEdgeWrapping

	return (
		<>
			{createPortal(
				<>
					<OrthographicCamera ref={cam} left={-0.5} right={0.5} top={0.5} bottom={-0.5} position={[0, 0, 5]} />
					<mesh>
						<planeGeometry />
						<unpackSdfMaterial key={UnpackSdfMaterial.key} sdfMap={sdfMap} premultipliedAlpha={false} />
					</mesh>
				</>,
				fboScene,
			)}
			{render(target.texture)}
		</>
	)
}
