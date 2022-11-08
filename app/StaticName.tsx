import {useTexture} from "@react-three/drei"
import {useFrame, useThree} from "@react-three/fiber"
import {useEffect, useRef, useState} from "react"

import type {ReactElement} from "react"
import StaticMaterial from "./StaticMaterial"
import {ShaderMaterial} from "three"

const nameMapAspect = 2132 / 1322 // Dimensions of name-map.png

const StaticName = (): ReactElement | null => {
	const nameMap = useTexture(`/name-map.png`)

	// Fit the name box in the canvas
	const [nameBoxHeight, setNameBoxHeight] = useState(0)
	const viewport = useThree((state) => state.viewport)
	useEffect(() => {
		setNameBoxHeight(viewport.aspect > nameMapAspect ? viewport.height : viewport.width / nameMapAspect)
	}, [viewport.aspect, viewport.height, viewport.width])

	// Update time uniform
	const staticRef = useRef<ShaderMaterial | null>(null)
	useFrame((state, delta) => {
		if (!staticRef.current) return
		staticRef.current.uniforms.time.value += delta
	})

	return (
		<mesh scale={[nameBoxHeight * nameMapAspect, nameBoxHeight, 1]}>
			<planeGeometry />
			<staticMaterial key={StaticMaterial.key} nameMap={nameMap} ref={staticRef} />
		</mesh>
	)
}

export default StaticName
