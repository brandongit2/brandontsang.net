"use client"

import {OrthographicCamera, useFBO, useTexture} from "@react-three/drei"
import {createPortal, useFrame, useThree} from "@react-three/fiber"
import {useRef, type ReactElement, useMemo, forwardRef, useState} from "react"
import {BufferGeometry, Scene, BufferAttribute, Vector3} from "three"
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

	const text = `BRANDON\nTSANG`

	const msdfMap = useTexture(`/Righteous-Regular.png`)

	const fboScene = useMemo(() => {
		const scene = new Scene()
		return scene
	}, [])
	const cam = useRef<Camera>(null)

	const target = useFBO()
	useFrame(() => {
		if (!cam.current) return

		gl.setRenderTarget(target)
		gl.render(fboScene, cam.current)
		gl.setRenderTarget(null)
	})

	const strLayout = useMemo(() => bmFontLayout(font, text), [font, text])

	const textGeom = useMemo(() => {
		const geom = new BufferGeometry()

		const vertices = []
		const indices = []
		const uvs = []
		for (let i = 0; i < strLayout.length; i++) {
			const char = strLayout[i]
			vertices.push(
				...[
					[char.dstU, char.dstV + char.height, 0], // top left, 0
					[char.dstU + char.width, char.dstV + char.height, 0], // top right, 1
					[char.dstU, char.dstV, 0], // bottom left, 2
					[char.dstU + char.width, char.dstV, 0], // bottom right, 3
				].flat(),
			)
			const idx = i * 4
			indices.push(
				...[
					[idx + 0, idx + 2, idx + 1],
					[idx + 2, idx + 3, idx + 1],
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
		}

		geom.setAttribute(`position`, new BufferAttribute(new Float32Array(vertices), 3))
		geom.setIndex(indices)
		geom.setAttribute(`uv`, new BufferAttribute(new Float32Array(uvs), 2))

		return geom
	}, [strLayout])

	let maxWidth = 400 // pixels
	const textDims = useMemo(
		() => ({
			width: Math.max(...strLayout.map((char) => char.dstU + char.width)),
			height: Math.max(...strLayout.map((char) => 1 - char.dstV)),
		}),
		[strLayout],
	)

	const canvasAspect = canvasWidth / canvasHeight
	const textAspect = textDims.width / textDims.height
	const viewportWidth = textAspect > canvasAspect ? textDims.width : textDims.height * canvasAspect
	const viewportHeight = textAspect > canvasAspect ? textDims.width / canvasAspect : textDims.height
	const xOffset = (viewportWidth - textDims.width) / 2
	const yOffset = (viewportHeight - textDims.height) / 2

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
			<mesh geometry={textGeom}>
				<nameTextMaterial key={NameTextMaterial.key} msdfMap={msdfMap} transparent />
			</mesh>
		</>
	)
})

export default NameComposite
