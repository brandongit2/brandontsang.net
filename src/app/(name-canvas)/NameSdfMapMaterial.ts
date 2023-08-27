import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {DataTexture, FloatType, Matrix3, NearestFilter, RedFormat, Texture} from "three"

import glsl from "@/helpers/glsl"

export type NameSdfMapMaterialUniforms = {
	sdfMap: Texture
	charData: Texture
	stringLength: number
	transitionProg?: number
	canvasWidth: number
	canvasHeight: number
	marginSize: number
	textToScreenSpaceMatrix: Matrix3
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
		transitionProg: 0,
		canvasWidth: 0,
		canvasHeight: 0,
		marginSize: 0,
		textToScreenSpaceMatrix: new Matrix3(),
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
    uniform float transitionProg;
    uniform float canvasWidth;
    uniform float canvasHeight;
    uniform float marginSize;
    uniform mat3 textToScreenSpaceMatrix;

    #define RECT_PADDING 140.0
    #define CORNER_RADIUS 20.0

    void main() {
      float textAlpha = 0.0;
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
        if (glyph > textAlpha) textAlpha = glyph;
      }

      // The rectangle, for when the name isn't on the stage
      float rectAlpha = 0.0;
      vec2 screenCoord = (textToScreenSpaceMatrix * vec3(vUv, 1.0)).xy;
      vec2 rectCenter = vec2(canvasWidth / 2.0, canvasHeight / 2.0);
      vec2 rectDims = vec2(canvasWidth - marginSize * 2.0, canvasHeight - marginSize * 2.0) - RECT_PADDING * 2.0;
      vec2 distToRectCorner = abs(screenCoord - rectCenter) - rectDims / 2.0;
      float distToRect;
      if (distToRectCorner.x < 0.0 && distToRectCorner.y < 0.0)
        // Inside the rectangle
        distToRect = max(distToRectCorner.x, distToRectCorner.y);
      else
        // Outside the rectangle
        distToRect = length(max(distToRectCorner, vec2(0.0)));

      // The rounded corners
      vec2 distToRadiusCenter = distToRectCorner + CORNER_RADIUS;
      float distToCornerRadius = length(distToRadiusCenter) - CORNER_RADIUS;
      if (distToRadiusCenter.x > 0.0 && distToRadiusCenter.y > 0.0)
        distToRect = distToCornerRadius;
      rectAlpha = smoothstep(RECT_PADDING, 0.0, distToRect);

      // float staggeredTransitionProg = clamp(transitionProg * 2.0 - mix(0.0, transitionProg, 1.0 - textAlpha * 2.0), 0.0, 1.0);
      float mixAlpha = textAlpha;
      if (textAlpha * 2.0 > 1.0 - transitionProg) mixAlpha = rectAlpha;
      textAlpha = min(textAlpha + transitionProg, 1.0);
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
