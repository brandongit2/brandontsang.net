import {useTexture} from "@react-three/drei"
import {useFrame, useThree} from "@react-three/fiber"
import {useEffect, useRef, useState} from "react"

import type {ReactElement} from "react"
import type {ShaderMaterial} from "three"

import StaticMaterial from "./StaticMaterial"

const nameMapAspect = 2132 / 1322 // Dimensions of name-map.png

const StaticName = (): ReactElement | null => {
	const nameMap = useTexture(`/name-map.png`)

	// Fit the name box in the canvas
	const viewport = useThree((state) => state.viewport)

	// Update time uniform
	const staticRef = useRef<ShaderMaterial | null>(null)
	useFrame((state, delta) => {
		if (!staticRef.current) return
		staticRef.current.uniforms.time.value += delta
	})

	return (
		<mesh>
			<planeGeometry />
			<staticMaterial
				key={StaticMaterial.key}
				textureMap={nameMap}
				viewportResolution={[viewport.width, viewport.height]}
				ref={staticRef}
			/>
		</mesh>
	)
}

export default StaticName
