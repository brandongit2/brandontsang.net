import type {ReactElement} from "react"

const StaticName = (): ReactElement | null => {
	// const map = useTexture(`/name-map.png`)
	// const map = useLoader(TextureLoader, `/name-map.png`)

	return (
		<>
			{/* <mesh>
				<planeGeometry />
				<meshBasicMaterial map={map} />
			</mesh> */}

			<mesh scale={2}>
				<boxGeometry />
				<meshBasicMaterial color={0x00ff00} />
			</mesh>
			{/* <mesh position={[-100, -100, 0]} scale={30}>
				<boxGeometry />
				<meshBasicMaterial color={0x00ff00} />
			</mesh>
			<mesh position={[100, -100, 0]} scale={30}>
				<boxGeometry />
				<meshBasicMaterial color={0x00ff00} />
			</mesh>
			<mesh position={[-100, 100, 0]} scale={30}>
				<boxGeometry />
				<meshBasicMaterial color={0x00ff00} />
			</mesh>
			<mesh position={[100, 100, 0]} scale={30}>
				<boxGeometry />
				<meshBasicMaterial color={0x00ff00} />
			</mesh> */}
		</>
	)
}

export default StaticName
