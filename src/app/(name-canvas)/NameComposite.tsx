import {OrthographicCamera} from "@react-three/drei"
import {useFrame} from "@react-three/fiber"
import {useRef, forwardRef} from "react"
import {type ShaderMaterial, type OrthographicCamera as OrthographicCameraClass} from "three"

import type {TextLayout} from "@/helpers/bmFontLayout"

import MsdfName from "./MsdfName"
import NameRadiantMaterial from "./NameRadiantMaterial"
import NameSdfMap from "./NameSdfMap"

export type NameCompositeProps = {
	msdfTextLayout: TextLayout
	sdfTextLayout: TextLayout
}

const NameComposite = forwardRef<OrthographicCameraClass, NameCompositeProps>(function NameCompositeWithRef(
	{msdfTextLayout, sdfTextLayout},
	ref,
) {
	const radiantRef = useRef<ShaderMaterial | null>(null)
	useFrame((state, delta) => {
		if (!radiantRef.current) return
		radiantRef.current.uniforms.time.value += delta
	})

	return (
		<>
			<OrthographicCamera ref={ref} left={0} right={1} top={1} bottom={0} position={[0, 0, 5]} />
			<mesh>
				<planeGeometry>
					<bufferAttribute
						attach="attributes-position"
						args={[new Float32Array([0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0]), 3]}
					/>
				</planeGeometry>
				<NameSdfMap
					sdfTextLayout={sdfTextLayout}
					render={(texture) => (
						<nameRadiantMaterial
							key={NameRadiantMaterial.key}
							time={0}
							sdfMap={texture}
							premultipliedAlpha={false}
							ref={radiantRef}
						/>
					)}
				/>
			</mesh>
			<MsdfName msdfTextLayout={msdfTextLayout} />
		</>
	)
})

export default NameComposite
