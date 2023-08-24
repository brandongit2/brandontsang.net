"use client"

import {OrthographicCamera, useFBO, useTexture} from "@react-three/drei"
import {createPortal, useFrame, useThree} from "@react-three/fiber"
import {useRef, type ReactElement, useMemo, forwardRef} from "react"
import {FloatType, RedFormat, Scene} from "three"
import {type ShaderMaterial, type Camera} from "three"

import type {FontAtlas} from "@/types/FontAtlas"

import NameRadiantMaterial from "./NameRadiantMaterial"
import NameShadowMaterial from "./NameShadowMaterial"
import NameTextMaterial from "./NameTextMaterial"
import TextLayout from "./TextLayout"
import bmFontLayout from "@/helpers/bmFontLayout"

export type NameCompositeProps = {
	msdfFontAtlas: FontAtlas
	sdfFontAtlas: FontAtlas
}

const NameComposite = forwardRef<Camera, NameCompositeProps>(function NameCompositeWithRef(
	{msdfFontAtlas, sdfFontAtlas},
	ref,
): ReactElement | null {
	const gl = useThree((state) => state.gl)

	const radiantRef = useRef<ShaderMaterial | null>(null)
	useFrame((state, delta) => {
		if (!radiantRef.current) return
		radiantRef.current.uniforms.time.value += delta
	})

	const fboScene = useMemo(() => new Scene(), [])
	const cam = useRef<Camera>(null)
	const target = useFBO({type: FloatType, format: RedFormat})
	useFrame(() => {
		if (!cam.current) return

		gl.setRenderTarget(target)
		gl.render(fboScene, cam.current)
		gl.setRenderTarget(null)
	})

	const text = `BRANDON\nTSANG`
	const msdfMap = useTexture(`/Righteous-Regular-msdf.png`)
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
			{createPortal(<TextLayout ref={cam} sdfFontAtlas={sdfFontAtlas} sdfTextLayout={sdfTextLayout} />, fboScene)}
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
				<planeGeometry>
					<bufferAttribute
						attach="attributes-position"
						args={[new Float32Array([0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0]), 3]}
					/>
					<bufferAttribute attach="attributes-uv" args={[new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]), 2]} />
				</planeGeometry>
				<nameShadowMaterial
					key={NameShadowMaterial.key}
					sdfMap={target.texture}
					premultipliedAlpha={false}
					transparent
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
