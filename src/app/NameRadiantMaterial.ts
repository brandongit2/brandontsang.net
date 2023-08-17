import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {Texture} from "three"

import glsl from "@/helpers/glsl"

export type NameRadiantMaterialUniforms = {
	time: number
	sdfMap: Texture
}

const NameRadiantMaterial = shaderMaterial(
	{time: 0, sdfMap: new Texture()} satisfies NameRadiantMaterialUniforms,
	glsl`
    out vec2 vUv;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vUv = uv;
    }
  `,
	glsl`
    in vec2 vUv;

    uniform sampler2D sdfMap;
    uniform float time;

    void main() {
      float tex = texture2D(sdfMap, vec2(vUv.x, vUv.y)).a;
      float dist = max(tex - 0.02, 0.0);
      float fade = fract(-time * 0.3 - dist * 5.0) * 0.6;
      fade *= pow(dist, 0.5);

      vec3 purple = vec3(0.17, 0.01, 0.17);
      vec3 yellow = vec3(0.991, 0.88, 0.28);
      pc_fragColor = vec4(yellow, fade);
    }
  `,
)

extend({NameRadiantMaterial})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			nameRadiantMaterial: NameRadiantMaterialUniforms & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export default NameRadiantMaterial
