import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {DataTexture, FloatType, NearestFilter, RedFormat, Texture} from "three"

import glsl from "@/helpers/glsl"

export type NameSdfMapMaterialUniforms = {
	sdfMap: Texture
	charData: Texture
	stringLength: number
}

const charData = new DataTexture(new Float32Array(1), 1, 1, RedFormat, FloatType)
charData.minFilter = NearestFilter
charData.magFilter = NearestFilter
charData.needsUpdate = true

const NameSdfMapMaterial = shaderMaterial(
	{
		sdfMap: new Texture(),
		charData,
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
    uniform sampler2D charData;

    void main() {
      float textAlpha = 0.0;
      int idx;
      float u, v, width, height, dstU, dstV, dstWidth, dstHeight, glyph;
      bool insideX, insideY;
      #pragma unroll_loop_start
      for (int i = 0; i < 16; i++) {
        idx = UNROLLED_LOOP_INDEX * 8;
        u = texelFetch(charData, ivec2(idx, 0), 0).r;
        v = texelFetch(charData, ivec2(idx + 1, 0), 0).r;
        width = texelFetch(charData, ivec2(idx + 2, 0), 0).r;
        height = texelFetch(charData, ivec2(idx + 3, 0), 0).r;
        dstU = texelFetch(charData, ivec2(idx + 4, 0), 0).r;
        dstV = texelFetch(charData, ivec2(idx + 5, 0), 0).r;
        dstWidth = texelFetch(charData, ivec2(idx + 6, 0), 0).r;
        dstHeight = texelFetch(charData, ivec2(idx + 7, 0), 0).r;

        insideX = (vUv.x >= dstU) && (vUv.x <= (dstU + dstWidth));
        insideY = (vUv.y >= dstV) && (vUv.y <= (dstV + dstHeight));
        if (insideX && insideY) {
          glyph = texture2D(sdfMap, vec2((vUv.x - dstU) * width / dstWidth + u, (vUv.y - dstV) * height / dstHeight + v)).r;
          if (glyph > textAlpha) textAlpha = glyph;
        }
      }
      #pragma unroll_loop_end

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
