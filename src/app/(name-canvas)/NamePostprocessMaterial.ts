import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {Matrix3, Texture} from "three"

import glsl from "@/helpers/glsl"

export type NamePostprocessMaterialUniforms = {
	nameMap: Texture
	canvasWidth: number
	canvasHeight: number
	screenToTextSpaceMatrix: Matrix3
}

const NamePostprocessMaterial = shaderMaterial(
	{
		nameMap: new Texture(),
		canvasWidth: 1,
		canvasHeight: 1,
		screenToTextSpaceMatrix: new Matrix3(),
	} satisfies NamePostprocessMaterialUniforms,
	glsl`
    out vec2 vUv;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vUv = uv;
    }
  `,
	glsl`
    in vec2 vUv;

		uniform sampler2D nameMap;
		uniform float canvasWidth;
		uniform float canvasHeight;
		uniform mat3 screenToTextSpaceMatrix;

    void main() {
			vec2 xy = vUv * vec2(canvasWidth, canvasHeight);
			vec3 textUv = screenToTextSpaceMatrix * vec3(xy, 1.0);
			vec4 color = texture2D(nameMap, textUv.xy);
      pc_fragColor = vec4(color.rgb, 1.0);
    }
  `,
)

extend({NamePostprocessMaterial})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			namePostprocessMaterial: NamePostprocessMaterialUniforms & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export default NamePostprocessMaterial
