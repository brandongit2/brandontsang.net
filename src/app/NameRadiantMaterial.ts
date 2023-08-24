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
      float tex = texture2D(sdfMap, vUv).r;
      float dist = 1.0 - tex * 2.0;
      dist = -1.0 / (50.0 * (dist - 1.035)) + 0.445 * dist - 0.02;

      float steepness = 8.0;
      float speed = 0.016;
      float spacing = 0.9; // Relative to size of wave
      float fade = fract((dist - time * speed) * steepness);
      fade *= fade;
      fade = max((fract(fade) - 1.0) * spacing + 1.0, 0.2);

      float dimmingFactor = 0.5;
      fade *= max(0.99 - dist, 0.0) * dimmingFactor;

      vec3 fore = vec3(0.98431, 1.0, 0.47059);
      pc_fragColor = vec4(fore, fade);
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
