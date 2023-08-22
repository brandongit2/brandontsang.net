"use client"

import {OrthographicCamera, useFBO, useTexture} from "@react-three/drei"
import {createPortal, useFrame, useThree} from "@react-three/fiber"
import {useRef, type ReactElement, useMemo, forwardRef} from "react"
import {Scene} from "three"
import {type ShaderMaterial, type Camera} from "three"

import type {BMFont} from "@/types/BMFont"

import NameRadiantMaterial from "./NameRadiantMaterial"
import NameTextMaterial from "./NameTextMaterial"
import TextLayout from "./TextLayout"
import bmFontLayout from "@/helpers/bmFontLayout"

export type NameCompositeProps = {
	msdfFont: BMFont
	sdfFont: BMFont
}

const NameComposite = forwardRef<Camera, NameCompositeProps>(function NameCompositeWithRef(
	{msdfFont, sdfFont},
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
	const target = useFBO()
	useFrame(() => {
		if (!cam.current) return

		gl.setRenderTarget(target)
		gl.render(fboScene, cam.current)
		gl.setRenderTarget(null)
	})

	const text = `BRANDON\nTsang`
	const msdfMap = useTexture(`/Righteous-Regular-msdf.png`)
	const sdfTextLayout = useMemo(() => {
		const layout = bmFontLayout(sdfFont, text)
		return layout
	}, [sdfFont, text])
	const msdfTextLayout = useMemo(() => {
		const layout = bmFontLayout(msdfFont, text)
		const sdfLetterE = sdfFont.chars.find((c) => c.char === `E`)!
		const msdfLetterE = msdfFont.chars.find((c) => c.char === `E`)!
		const horzFactor = sdfLetterE.xadvance / sdfTextLayout.texelW / (msdfLetterE.xadvance / layout.texelW)
		const vertFactor = sdfFont.info.size / sdfTextLayout.texelH / (msdfFont.info.size / layout.texelH)
		layout.layout.forEach((char) => {
			char.dstU -= msdfFont.info.padding[0] / layout.texelW
			char.dstV = char.dstV - 1 + msdfFont.info.padding[0] / layout.texelH
			char.dstWidth *= horzFactor
			char.dstHeight *= vertFactor
			char.dstU *= horzFactor
			char.dstV *= vertFactor
			char.dstU += sdfFont.info.padding[0] / sdfTextLayout.texelW
			char.dstV = char.dstV + 1 - sdfFont.info.padding[0] / sdfTextLayout.texelH
		})
		return layout
	}, [
		msdfFont,
		sdfFont.chars,
		sdfFont.info.padding,
		sdfFont.info.size,
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
			{createPortal(<TextLayout ref={cam} textLayout={sdfTextLayout} />, fboScene)}
			<mesh>
				<planeGeometry>
					<bufferAttribute
						attach="attributes-position"
						args={[new Float32Array([0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0]), 3]}
					/>
					<bufferAttribute attach="attributes-uv" args={[new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]), 2]} />
				</planeGeometry>
				<nameRadiantMaterial key={NameRadiantMaterial.key} time={0} sdfMap={target.texture} ref={radiantRef} />
			</mesh>
			{/* <mesh scale={[0.965, 0.417, 1]} position={[0.289, 0.297, 0]}> */}
			<mesh>
				<bufferGeometry>
					<bufferAttribute attach="attributes-position" args={[vertices, 3]} />
					<bufferAttribute attach="attributes-uv" args={[uvs, 2]} />
					<bufferAttribute attach="index" args={[indices, 1]} />
				</bufferGeometry>
				<nameTextMaterial key={NameTextMaterial.key} msdfMap={msdfMap} transparent />
			</mesh>
		</>
	)
})

export default NameComposite
