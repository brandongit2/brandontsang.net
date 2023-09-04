import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {Texture} from "three"

import glsl from "@/helpers/glsl"

export type MsdfNameMaterial = {
	msdfMap: Texture
}

const MsdfNameMaterial = shaderMaterial(
	{msdfMap: new Texture()} satisfies MsdfNameMaterial,
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
      vec3 fore = vec3(0.98039, 1.0, 0.38431); // More saturated version of text colour
      float d = median(color.r, color.g, color.b) - 0.5;
      float w = clamp(d / fwidth(d) + 0.5, 0.0, 1.0);
      pc_fragColor = vec4(fore, w);
    }
  `,
)

extend({MsdfNameMaterial})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			msdfNameMaterial: MsdfNameMaterial & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export default MsdfNameMaterial
