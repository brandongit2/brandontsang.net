import {Text} from "@react-three/drei"
import {Canvas} from "@react-three/fiber"

import type {ReactElement} from "react"

export default function OffscreenCanvas(): ReactElement | null {
	return (
		<div className="fixed top-0 w-96 h-64">
			<Canvas linear flat id="offscreen-canvas">
				<Text font="/Righteous-Regular.ttf" color="white" scale={1.3}>
					BRANDON TSANG
				</Text>
			</Canvas>
		</div>
	)
}
