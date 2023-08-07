"use client"

import {useFBO, useTexture} from "@react-three/drei"
import {createPortal, useFrame, useThree} from "@react-three/fiber"
import {useRef, type ReactElement, useMemo, useEffect} from "react"
import {BufferGeometry, Scene, BufferAttribute, Vector3} from "three"
import {type ShaderMaterial, type Camera} from "three"

import type {BMFont} from "@/types/BMFont"

import NameMaterial from "./NameMaterial"
import NameRadiantMaterial from "./NameRadiantMaterial"
import SdfScene from "./SdfScene"
import bmFontLayout from "@/helpers/bmFontLayout"

export type FancyNameClientProps = {
	font: BMFont[`font`]
}

export default function FancyNameClient({font}: FancyNameClientProps): ReactElement | null {
	const gl = useThree((state) => state.gl)
	useEffect(() => {
		gl.setClearColor(0x000000, 0)
	}, [gl])

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

	const scale = 3
	const textGeom = useMemo(() => {
		const strLayout = bmFontLayout(font, text)
		const geom = new BufferGeometry()

		const vertices = []
		const indices = []
		const uvs = []
		for (let i = 0; i < strLayout.length; i++) {
			const char = strLayout[i]
			vertices.push(
				...[
					[char.dstU * scale, (char.dstV + char.height - 1) * scale + 1, 0], // top left, 0
					[(char.dstU + char.width) * scale, (char.dstV + char.height - 1) * scale + 1, 0], // top right, 1
					[char.dstU * scale, (char.dstV - 1) * scale + 1, 0], // bottom left, 2
					[(char.dstU + char.width) * scale, (char.dstV - 1) * scale + 1, 0], // bottom right, 3
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
	}, [font, text])

	return (
		<>
			{createPortal(<SdfScene ref={cam} font={font} text={text} />, fboScene)}
			<mesh position={new Vector3(0.5, 0.5, 0)}>
				<planeGeometry />
				<nameRadiantMaterial
					key={NameRadiantMaterial.key}
					time={0}
					scale={scale}
					sdfMap={target.texture}
					ref={radiantRef}
				/>
			</mesh>
			<mesh geometry={textGeom}>
				<nameMaterial key={NameMaterial.key} msdfMap={msdfMap} transparent />
			</mesh>
		</>
	)
}
