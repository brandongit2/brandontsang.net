import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {Texture} from "three"

import glsl from "@/helpers/glsl"

export type StaticEffectMaterialUniforms = {
	time: number
	nameMap: Texture
}

const StaticEffectMaterial = shaderMaterial(
	{time: 0, nameMap: new Texture()} satisfies StaticEffectMaterialUniforms,
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

    void main() {
			vec4 color = texture2D(nameMap, vUv);
      pc_fragColor = color;
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
