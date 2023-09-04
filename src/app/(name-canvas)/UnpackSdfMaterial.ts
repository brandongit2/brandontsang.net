import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {Texture} from "three"

import glsl from "@/helpers/glsl"

export type UnpackSdfMaterialUniforms = {
	sdfMap: Texture
}

const UnpackSdfMaterial = shaderMaterial(
	{sdfMap: new Texture()} satisfies UnpackSdfMaterialUniforms,
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
      vec4 texel = texelFetch(sdfMap, ivec2(int(floor(vUv.x * 1096.0 / 2.0)), int(vUv.y * 1096.0)), 0);
      bool isFirst = int(vUv.x * 1096.0) % 2 == 0;
      uint unpackedTexel = isFirst
        ? uint(texel.r * 255.0) + (uint(texel.g * 255.0) << 8)
        : uint(texel.b * 255.0) + (uint(texel.a * 255.0) << 8);
      pc_fragColor = vec4(float(unpackedTexel) / 65535.0, 1.0, 1.0, 1.0);
    }
  `,
)

extend({UnpackSdfMaterial})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			unpackSdfMaterial: UnpackSdfMaterialUniforms & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export default UnpackSdfMaterial
