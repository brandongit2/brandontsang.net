"use client"

import {OrthographicCamera, useFBO, useTexture} from "@react-three/drei"
import {createPortal, useFrame, useThree} from "@react-three/fiber"
import {useRef, type ReactElement, useMemo, forwardRef} from "react"
import {Scene, Vector3} from "three"
import {type ShaderMaterial, type Camera} from "three"

import type {BMFont} from "@/types/BMFont"

import NameRadiantMaterial from "./NameRadiantMaterial"
import NameTextMaterial from "./NameTextMaterial"
import TextLayout from "./TextLayout"
import bmFontLayout from "@/helpers/bmFontLayout"

export type NameCompositeProps = {
	font: BMFont[`font`]
}

const NameComposite = forwardRef<Camera, NameCompositeProps>(function NameCompositeWithRef(
	{font},
	ref,
): ReactElement | null {
	const {
		size: {width: canvasWidth, height: canvasHeight},
	} = useThree()
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

	const text = `BRANDON\nTSANG`
	const msdfMap = useTexture(`/Righteous-Regular-msdf.png`)
	const strLayout = useMemo(() => bmFontLayout(font, text), [font, text])
	const {vertices, uvs, indices} = useMemo(() => {
		const vertices = []
		const uvs = []
		const indices = []
		for (let i = 0; i < strLayout.length; i++) {
			const char = strLayout[i]
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
	}, [strLayout])

	const textWidth = Math.max(...strLayout.map((char) => char.dstU + char.width))
	const textHeight = Math.max(...strLayout.map((char) => 1 - char.dstV))

	const canvasAspect = canvasWidth / canvasHeight
	const textAspect = textWidth / textHeight
	const viewportWidth = textAspect > canvasAspect ? textWidth : textHeight * canvasAspect
	const viewportHeight = textAspect > canvasAspect ? textWidth / canvasAspect : textHeight
	const xOffset = (viewportWidth - textWidth) / 2
	const yOffset = (viewportHeight - textHeight) / 2

	return (
		<>
			<OrthographicCamera
				ref={ref}
				left={-xOffset}
				right={viewportWidth - xOffset}
				top={1 + yOffset}
				bottom={1 - viewportHeight + yOffset}
				position={new Vector3(0, 0, 5)}
			/>
			{createPortal(<TextLayout ref={cam} font={font} text={text} />, fboScene)}
			<mesh position={new Vector3(0.5, 0.5, 0)}>
				<planeGeometry />
				<nameRadiantMaterial key={NameRadiantMaterial.key} time={0} sdfMap={target.texture} ref={radiantRef} />
			</mesh>
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
