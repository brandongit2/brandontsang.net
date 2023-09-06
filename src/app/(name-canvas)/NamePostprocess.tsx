import {OrthographicCamera, useFBO} from "@react-three/drei"
import {createPortal, useFrame, useThree} from "@react-three/fiber"
import {useMemo, type ReactElement, useRef} from "react"
import {Scene} from "three"

import type {TextLayout} from "@/helpers/bmFontLayout"
import type {OrthographicCamera as OrthographicCameraClass} from "three"

import NameComposite from "./NameComposite"
import NamePostprocessMaterial from "./NamePostprocessMaterial"
import {useScreenToTextSpaceMatrix} from "./transformMatrices"

export type NamePostprocessProps = {
	sdfTextLayout: TextLayout
	msdfTextLayout: TextLayout
}

export default function NamePostprocess({sdfTextLayout, msdfTextLayout}: NamePostprocessProps): ReactElement | null {
	const gl = useThree((state) => state.gl)
	const {width: canvasWidth, height: canvasHeight} = useThree((state) => state.viewport)

	const fboScene = useMemo(() => new Scene(), [])
	const cam = useRef<OrthographicCameraClass>(null)

	const target = useFBO()
	useFrame(() => {
		if (!cam.current) return

		gl.setRenderTarget(target)
		gl.render(fboScene, cam.current)
		gl.setRenderTarget(null)
	})

	const textAspect = sdfTextLayout.texelW / sdfTextLayout.texelH
	const screenToTextSpaceMatrix = useScreenToTextSpaceMatrix(canvasWidth, canvasHeight, textAspect)

	return (
		<>
			<OrthographicCamera makeDefault manual left={0} right={1} top={1} bottom={0} position={[0, 0, 5]} />
			{createPortal(
				<NameComposite ref={cam} msdfTextLayout={msdfTextLayout} sdfTextLayout={sdfTextLayout} />,
				fboScene,
			)}
			<mesh position={[0.5, 0.5, 0]}>
				<planeGeometry />
				<namePostprocessMaterial
					key={NamePostprocessMaterial.key}
					nameMap={target.texture}
					canvasWidth={canvasWidth}
					canvasHeight={canvasHeight}
					screenToTextSpaceMatrix={screenToTextSpaceMatrix}
					premultipliedAlpha={false}
				/>
			</mesh>
		</>
	)
}
