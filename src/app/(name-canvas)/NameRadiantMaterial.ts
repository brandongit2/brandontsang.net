import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {Texture} from "three"

import glsl from "@/helpers/glsl"

export type NameRadiantMaterialUniforms = {
	time: number
	sdfMap: Texture
	transitionProg?: number
}

const NameRadiantMaterial = shaderMaterial(
	{time: 0, sdfMap: new Texture(), transitionProg: 0} satisfies NameRadiantMaterialUniforms,
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
    uniform float transitionProg;

    void main() {
      float tex = texture2D(sdfMap, vUv).r; // tex is 0.5 at text, going to 0.0 at edge
      float dist = max(1.0 - tex * 2.0, 0.0); // dist is 0.0 at text, going to 1.0 at edge

      float steepness = 20.0;
      float speed = 0.016;
      float spacing = 0.9; // Relative to size of wave
      float fade = fract((dist - time * speed) * steepness);
      fade *= fade;
      fade = max((fract(fade) - 1.0) * spacing + 1.0, 0.2);

      // Max alpha gets lower the larger dist is
      float dimmingFactor = 0.5;
      fade *= max(1.0 - dist, 0.0) * dimmingFactor;
      if (dist < 0.0001) fade = 0.5;

      vec3 textColor = vec3(0.98431, 1.0, 0.47059);
      vec3 bgColor = vec3(0.13333, 0.30980, 0.14510);
			vec3 fakeOpacity = mix(bgColor, textColor, fade);
      pc_fragColor = vec4(fakeOpacity, 1.0);
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
