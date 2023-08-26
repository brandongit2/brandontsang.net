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
    uniform int stringLength;

    void main() {
      float maxAlpha = 0.0;

      for (int i = 0; i < stringLength; i++) {
        int idx = i * 8;
        float u = texelFetch(charData, ivec2(idx, 0), 0).r;
        float v = texelFetch(charData, ivec2(idx + 1, 0), 0).r;
        float width = texelFetch(charData, ivec2(idx + 2, 0), 0).r;
        float height = texelFetch(charData, ivec2(idx + 3, 0), 0).r;
        float dstU = texelFetch(charData, ivec2(idx + 4, 0), 0).r;
        float dstV = texelFetch(charData, ivec2(idx + 5, 0), 0).r;
        float dstWidth = texelFetch(charData, ivec2(idx + 6, 0), 0).r;
        float dstHeight = texelFetch(charData, ivec2(idx + 7, 0), 0).r;

        bool insideX = (vUv.x >= dstU) && (vUv.x <= (dstU + dstWidth));
        bool insideY = (vUv.y >= dstV) && (vUv.y <= (dstV + dstHeight));
        if (!insideX || !insideY) continue;

        float glyph = texture2D(sdfMap, vec2((vUv.x - dstU) * width / dstWidth + u, (vUv.y - dstV) * height / dstHeight + v)).r;
        if (glyph > maxAlpha) maxAlpha = glyph;
      }

      float transitionProg = 0.5;
      pc_fragColor = vec4(maxAlpha, 1.0, 1.0, 1.0);
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
