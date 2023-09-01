import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {Matrix3, Texture} from "three"

import glsl from "@/helpers/glsl"

export type StaticEffectMaterialUniforms = {
	time: number
	nameMap: Texture
	canvasWidth: number
	canvasHeight: number
	marginSize: number
	screenToTextSpaceMatrix: Matrix3
}

const StaticEffectMaterial = shaderMaterial(
	{
		time: 0,
		nameMap: new Texture(),
		canvasWidth: 1,
		canvasHeight: 1,
		marginSize: 1,
		screenToTextSpaceMatrix: new Matrix3(),
	} satisfies StaticEffectMaterialUniforms,
	glsl`
    out vec2 vUv;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vUv = uv;
    }
  `,
	glsl`
    in vec2 vUv;

    uniform float time;
		uniform sampler2D nameMap;
		uniform float canvasWidth;
		uniform float canvasHeight;
		uniform float marginSize;
		uniform mat3 screenToTextSpaceMatrix;

    void main() {
			vec2 xy = vUv * vec2(canvasWidth, canvasHeight);
			vec3 textUv = screenToTextSpaceMatrix * vec3(xy, 1.0);
			vec4 color = texture2D(nameMap, textUv.xy);
      pc_fragColor = vec4(color.rgb, 1.0);
    }
  `,
)

extend({StaticEffectMaterial})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			staticEffectMaterial: StaticEffectMaterialUniforms & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export default StaticEffectMaterial
