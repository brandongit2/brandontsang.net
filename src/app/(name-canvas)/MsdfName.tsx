import {useTexture} from "@react-three/drei"
import {useMemo} from "react"

import type {TextLayout} from "@/helpers/bmFontLayout"

import MsdfNameMaterial from "./MsdfNameMaterial"

export type MsdfNameProps = {
	msdfTextLayout: TextLayout
}

export default function MsdfName({msdfTextLayout}: MsdfNameProps) {
	const msdfMap = useTexture(`/fonts/Karrik-Regular/Karrik-Regular-msdf.png`)

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
		<mesh>
			<bufferGeometry>
				<bufferAttribute attach="attributes-position" args={[vertices, 3]} />
				<bufferAttribute attach="attributes-uv" args={[uvs, 2]} />
				<bufferAttribute attach="index" args={[indices, 1]} />
			</bufferGeometry>
			<msdfNameMaterial key={MsdfNameMaterial.key} msdfMap={msdfMap} transparent premultipliedAlpha={false} />
		</mesh>
	)
}
