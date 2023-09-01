import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {Texture} from "three"

import glsl from "@/helpers/glsl"

export type NameSdfMapMaterialUniforms = {
	sdfMap: Texture
	charData: number[]
	stringLength: number
}

const NameSdfMapMaterial = shaderMaterial(
	{
		sdfMap: new Texture(),
		charData: [],
		stringLength: 1,
	} satisfies NameSdfMapMaterialUniforms,
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
    uniform float charData[512]; // Accommodates 16 characters

    void main() {
      float textAlpha = 0.0;
      int idx;
      float u, v, width, height, dstU, dstV, dstWidth, dstHeight, glyph;
      bool insideX, insideY;
      #pragma unroll_loop_start
      for (int i = 0; i < 16; i++) {
        idx = UNROLLED_LOOP_INDEX * 8;
        u = charData[idx];
        v = charData[idx + 1];
        width = charData[idx + 2];
        height = charData[idx + 3];
        dstU = charData[idx + 4];
        dstV = charData[idx + 5];
        dstWidth = charData[idx + 6];
        dstHeight = charData[idx + 7];

        insideX = (vUv.x >= dstU) && (vUv.x <= (dstU + dstWidth));
        insideY = (vUv.y >= dstV) && (vUv.y <= (dstV + dstHeight));
        if (insideX && insideY) {
          glyph = texture2D(sdfMap, vec2((vUv.x - dstU) * width / dstWidth + u, (vUv.y - dstV) * height / dstHeight + v)).r;
          if (glyph > textAlpha) textAlpha = glyph;
        }
      }
      #pragma unroll_loop_end

      pc_fragColor = vec4(textAlpha, 1.0, 1.0, 1.0);
      pc_fragColor = vec4(textAlpha, 1.0, 1.0, 1.0);
    }
  `,
)

extend({NameSdfMapMaterial})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			nameSdfMapMaterial: NameSdfMapMaterialUniforms & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export default NameSdfMapMaterial
