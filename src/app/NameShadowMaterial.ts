import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {Texture} from "three"

import glsl from "@/helpers/glsl"

export type NameShadowMaterialUniforms = {
	sdfMap: Texture
}

const NameShadowMaterial = shaderMaterial(
	{sdfMap: new Texture()} satisfies NameShadowMaterialUniforms,
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

    void main() {
      float tex = texture2D(sdfMap, vUv).r;
      float dist = tex * 2.0;
      dist *= dist;

      float opacity = 0.2;
      float steepness = 2.0;
      float shadow = max((dist - 1.0) * steepness + opacity, 0.0);
      pc_fragColor = vec4(0.0, 0.0, 0.0, shadow);
    }
  `,
)

extend({NameShadowMaterial})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			nameShadowMaterial: NameShadowMaterialUniforms & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export default NameShadowMaterial
