import {useFrame, useLoader, useThree} from "@react-three/fiber"
import {useMemo, useRef} from "react"
import {type ShaderMaterial} from "three"
import createGeometry from "three-bmfont-text"

import type {ReactElement} from "react"

import StaticMaterial from "./StaticMaterial"
import BMFontLoader from "@/helpers/BMFontLoader"

const StaticName = (): ReactElement | null => {
	// Fit the name box in the canvas
	const viewport = useThree((state) => state.viewport)

	// Update time uniform
	const staticRef = useRef<ShaderMaterial | null>(null)
	useFrame((state, delta) => {
		if (!staticRef.current) return
		staticRef.current.uniforms.time.value += delta
	})

	const font = useLoader(BMFontLoader, `/Righteous-Regular.fnt`)
	const geometry = useMemo(() => createGeometry({width: 300, align: `right`, font: font}), [font])

	// useLoader(BMFontLoader, `/Righteous-Regular.fnt`)

	// useEffect(() => {
	// 	const loader = new TextureLoader()

	// 	loader.load(
	// 		`/Righteous-Regular.png`,
	// 		(texture) => {
	// 			// in this function you get the texture
	// 			setFontAtlas(texture)
	// 		},
	// 		(xhr) => {
	// 			// called while loading is progressing
	// 			console.log((xhr.loaded / xhr.total) * 100 + `% loaded`)
	// 		},
	// 		(error) => {
	// 			// called when loading has errors
	// 			console.error(`An error occurred:`, error)
	// 		},
	// 	)
	// }, [])

	// const textGeometry = useMemo(() => {
	// 	const geometry = createGeometry({
	// 		font: font,
	// 		size: 0.5,
	// 		flipY: fontAtlas?.flipY,
	// 	})
	// 	geometry.update(`Your Text`)
	// 	return geometry
	// }, [font, fontAtlas])
	// console.log(textGeometry)

	// useEffect(() => {
	// 	fontAtlas.needsUpdate = true
	// }, [fontAtlas])

	return (
		<mesh>
			<planeGeometry />
			<staticMaterial key={StaticMaterial.key} viewportResolution={[viewport.width, viewport.height]} ref={staticRef} />
		</mesh>
	)
}

export default StaticName
