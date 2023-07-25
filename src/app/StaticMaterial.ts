import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {ShaderChunk, Texture} from "three"

import glsl from "@/helpers/glsl"
import noise2D from "@/shaders/noise2D.glsl"
import random from "@/shaders/random.glsl"
//
;(ShaderChunk as Record<string, string>)["noise2D"] = noise2D
;(ShaderChunk as Record<string, string>)["random"] = random

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

    void main() {
      vec2 uv = gl_FragCoord.xy / viewportResolution.xy;
      float brightness = texture2D(textureMap, f_uv).r;
      brightness = pow(brightness, 4.0);

      vec2 pos = uv * 159.0 + floor(time * 30.0);
      float rand = noise2D(pos);
      float result;
      if (rand < brightness) {
        result = 1.0;
      } else {
        result = 0.0;
      }

      gl_FragColor = vec4(vec3(1.0), result);
    }
  `,
)

extend({StaticMaterial})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			staticMaterial: {
				textureMap: Texture
				viewportResolution: [number, number]
				time?: number
			} & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export default StaticMaterial
