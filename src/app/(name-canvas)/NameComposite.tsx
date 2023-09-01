"use client"

import {OrthographicCamera, useFBO, useTexture} from "@react-three/drei"
import {createPortal, useFrame, useThree} from "@react-three/fiber"
import {useRef, useMemo, forwardRef} from "react"
import {FloatType, RedFormat, Scene} from "three"
import {type ShaderMaterial, type OrthographicCamera as OrthographicCameraClass} from "three"

import type {TextLayout} from "@/helpers/bmFontLayout"
import type {FontAtlas} from "@/types/FontAtlas"

import NameRadiantMaterial from "./NameRadiantMaterial"
import NameSdfMap from "./NameSdfMap"
import NameTextMaterial from "./NameTextMaterial"

export type NameCompositeProps = {
	sdfFontAtlas: FontAtlas
	msdfTextLayout: TextLayout
	sdfTextLayout: TextLayout
}

const NameComposite = forwardRef<OrthographicCameraClass, NameCompositeProps>(function NameCompositeWithRef(
	{sdfFontAtlas, msdfTextLayout, sdfTextLayout},
	ref,
) {
	const gl = useThree((state) => state.gl)

	const radiantRef = useRef<ShaderMaterial | null>(null)
	useFrame((state, delta) => {
		if (!radiantRef.current) return
		radiantRef.current.uniforms.time.value += delta
	})

	const fboScene = useMemo(() => new Scene(), [])
	const cam = useRef<OrthographicCameraClass>(null)
	const target = useFBO({type: FloatType, format: RedFormat})
	useFrame(() => {
		if (!cam.current) return

		gl.setRenderTarget(target)
		gl.render(fboScene, cam.current)
		gl.setRenderTarget(null)
	})

	const msdfMap = useTexture(`/bmfont/Karrik-Regular-msdf.png`)

	const {vertices, uvs, indices} = useMemo(() => {
		const vertices = []
		const uvs = []
		const indices = []
		for (let i = 0; i < msdfTextLayout.layout.length; i++) {
			const char = msdfTextLayout.layout[i]
			vertices.push(
				...[
					[char.dstU, char.dstV + char.dstHeight, 0], // top left, 0
					[char.dstU + char.dstWidth, char.dstV + char.dstHeight, 0], // top right, 1
					[char.dstU, char.dstV, 0], // bottom left, 2
					[char.dstU + char.dstWidth, char.dstV, 0], // bottom right, 3
				].flat(),
			)
			uvs.push(
				...[
					[char.u, char.v + char.height], // top left, 0
					[char.u + char.width, char.v + char.height], // top right, 1
					[char.u, char.v], // bottom left, 2
					[char.u + char.width, char.v], // bottom right, 3
				].flat(),
			)
			const idx = i * 4
			indices.push(
				...[
					[idx + 0, idx + 2, idx + 1],
					[idx + 2, idx + 3, idx + 1],
				].flat(),
			)
		}

		return {
			vertices: new Float32Array(vertices),
			uvs: new Float32Array(uvs),
			indices: new Uint16Array(indices),
		}
	}, [msdfTextLayout.layout])

	return (
		<>
			<OrthographicCamera ref={ref} left={0} right={1} top={1} bottom={0} position={[0, 0, 5]} />
			{createPortal(<NameSdfMap ref={cam} sdfFontAtlas={sdfFontAtlas} sdfTextLayout={sdfTextLayout} />, fboScene)}
			<mesh>
				<planeGeometry>
					<bufferAttribute
						attach="attributes-position"
						args={[new Float32Array([0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0]), 3]}
					/>
					<bufferAttribute attach="attributes-uv" args={[new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]), 2]} />
				</planeGeometry>
				<nameRadiantMaterial
					key={NameRadiantMaterial.key}
					time={0}
					sdfMap={target.texture}
					premultipliedAlpha={false}
					ref={radiantRef}
				/>
			</mesh>
			<mesh>
				<bufferGeometry>
					<bufferAttribute attach="attributes-position" args={[vertices, 3]} />
					<bufferAttribute attach="attributes-uv" args={[uvs, 2]} />
					<bufferAttribute attach="index" args={[indices, 1]} />
				</bufferGeometry>
				<nameTextMaterial key={NameTextMaterial.key} msdfMap={msdfMap} transparent premultipliedAlpha={false} />
			</mesh>
		</>
	)
})

export default NameComposite
