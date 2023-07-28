import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {ShaderChunk, Texture} from "three"

import glsl from "@/helpers/glsl"
import noise2D from "@/shaders/noise2D.glsl"
import random from "@/shaders/random.glsl"
//
;(ShaderChunk as Record<string, string>)[`noise2D`] = noise2D
;(ShaderChunk as Record<string, string>)[`random`] = random

const StaticMaterial = shaderMaterial(
	{textureMap: new Texture(), time: 0, viewportResolution: [100, 100]},
	glsl`
    out vec2 f_uv;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      f_uv = uv;
    }
  `,
	glsl`
    in vec2 f_uv;

    uniform sampler2D textureMap;
    uniform float time;
    uniform vec2 viewportResolution;

    #include <noise2D>

    #define blurSize 10.0
    #define texelSize 1.0 / viewportResolution.xy

    void main() {
      vec2 uv = gl_FragCoord.xy / viewportResolution.xy;
      float color = texture2D(textureMap, f_uv).r;

      float brightness = 0.0;
      for (float x = -blurSize; x <= blurSize; x++) {
        for (float y = -blurSize; y <= blurSize; y++) {
          vec2 offset = vec2(x, y) * texelSize;
          brightness += texture2D(textureMap, f_uv + offset).r;
        }
      }
      brightness /= (blurSize * 2.0 + 1.0) * (blurSize * 2.0 + 1.0);
      brightness *= 0.5;

      if (color == 1.0) {
        brightness = 0.995;
      }

      // brightness = pow(brightness, 4.0);

      vec2 pos = vec2(uv.x * 138.1, uv.y * 211.3) + floor(time * 30.0);
      float rand = noise2D(pos);
      float result;
      if (rand < brightness) {
        result = 1.0;
      } else {
        result = 0.0;
      }

      vec3 yellow = vec3(0.991, 0.88, 0.28);
      vec3 purple = vec3(0.17, 0.01, 0.17);
      gl_FragColor = vec4(mix(purple, yellow, result), 1.0);
    }
  `,
)

extend({StaticMaterial})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			staticMaterial: {
				viewportResolution: [number, number]
				time?: number
			} & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export default StaticMaterial
