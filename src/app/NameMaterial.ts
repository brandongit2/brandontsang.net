import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {Texture} from "three"

import glsl from "@/helpers/glsl"

export type NameMaterialUniforms = {
	msdfMap: Texture
}

const NameMaterial = shaderMaterial(
	{msdfMap: new Texture()} satisfies NameMaterialUniforms,
	glsl`
    out vec2 vUv;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vUv = uv;
    }
  `,
	glsl`
    in vec2 vUv;

    uniform sampler2D msdfMap;

    float median(float r, float g, float b) {
      return max(min(r, g), min(max(r, g), b));
    }

    void main() {
      vec3 color = texture2D(msdfMap, vUv).rgb;
      vec3 purple = vec3(0.17, 0.01, 0.17);
      vec3 yellow = vec3(0.991, 0.88, 0.28);
      float d = median(color.r, color.g, color.b) - 0.5;
      float w = clamp(d / fwidth(d) + 0.5, 0.0, 1.0);
      pc_fragColor = vec4(yellow, w);
    }
  `,
)

extend({NameMaterial})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			nameMaterial: NameMaterialUniforms & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export default NameMaterial
