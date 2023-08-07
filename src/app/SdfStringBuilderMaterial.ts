import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {DataTexture, FloatType, NearestFilter, RedFormat, Texture} from "three"

import glsl from "@/helpers/glsl"

export type SdfStringBuilderMaterialUniforms = {
	sdfMap: Texture
	sdfMapDimensions: [number, number]
	charData: Texture
	string: number[]
}

const charData = new DataTexture(new Float32Array(1), 1, 1, RedFormat, FloatType)
charData.minFilter = NearestFilter
charData.magFilter = NearestFilter
charData.needsUpdate = true

const SdfStringBuilderMaterial = shaderMaterial(
	{
		sdfMap: new Texture(),
		sdfMapDimensions: [512, 512],
		charData,
		string: [],
	} satisfies SdfStringBuilderMaterialUniforms,
	glsl`
    out vec2 f_uv;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      f_uv = uv;
    }
  `,
	glsl`
    in vec2 f_uv;

    uniform sampler2D sdfMap;
    uniform vec2 sdfMapDimensions;
    uniform sampler2D charData;
    uniform int string[32];

    #define scale 1.0

    void main() {
      float maxAlpha = 0.0;
      vec2 uv = vec2(f_uv.x / scale, (f_uv.y - 1.0) / scale + 1.0);

      for (int i = 0; i < 32; i++) {
        float u = texelFetch(charData, ivec2(i * 6, 0), 0).r;
        float v = texelFetch(charData, ivec2(i * 6 + 1, 0), 0).r;
        float width = texelFetch(charData, ivec2(i * 6 + 2, 0), 0).r;
        float height = texelFetch(charData, ivec2(i * 6 + 3, 0), 0).r;
        float dstU = texelFetch(charData, ivec2(i * 6 + 4, 0), 0).r;
        float dstV = texelFetch(charData, ivec2(i * 6 + 5, 0), 0).r;

        bool insideX = (uv.x >= dstU) && (uv.x <= (dstU + width));
        bool insideY = (uv.y >= dstV) && (uv.y <= (dstV + height));
        if (!insideX || !insideY) continue;

        float glyph = texture2D(sdfMap, vec2(u + uv.x - dstU, uv.y + v - dstV)).a;
        if (glyph > maxAlpha) maxAlpha = glyph;
      }

      pc_fragColor = vec4(1.0, 1.0, 1.0, maxAlpha);
    }
  `,
)

extend({SdfStringBuilderMaterial})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			sdfStringBuilderMaterial: SdfStringBuilderMaterialUniforms & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export default SdfStringBuilderMaterial
