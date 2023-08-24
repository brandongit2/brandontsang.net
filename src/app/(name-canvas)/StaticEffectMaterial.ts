import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"
import {Texture} from "three"

import glsl from "@/helpers/glsl"

export type StaticEffectMaterialUniforms = {
	time: number
	nameMap: Texture
	canvasAspect: number
	textAspect: number
	marginWidth: number
	marginHeight: number
}

const StaticEffectMaterial = shaderMaterial(
	{
		time: 0,
		nameMap: new Texture(),
		canvasAspect: 1,
		textAspect: 1,
		marginWidth: 1,
		marginHeight: 1,
	} satisfies StaticEffectMaterialUniforms,
	glsl`
    out vec2 vUv;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vUv = uv;
    }
  `,
	glsl`
    in vec2 vUv;

    uniform float time;
		uniform sampler2D nameMap;
		uniform float textAspect;
		uniform float canvasAspect;
		uniform float marginWidth;
		uniform float marginHeight;

		float extraScale = 1.2;

    void main() {
			float scaleX = canvasAspect > textAspect ? 1.0 : textAspect / canvasAspect;
			float scaleY = canvasAspect > textAspect ? canvasAspect / textAspect : 1.0;
			scaleX *= extraScale;
			scaleY *= extraScale;
			vec4 color = texture2D(nameMap, (vUv - vec2(0.5, 0.5)) * vec2(1.0 / scaleX, 1.0 / scaleY) + vec2(0.5, 0.5));

			// Shade margins
			float distFromSafeAreaX = (abs(vUv.x - 0.5) - 0.5) / marginWidth;
			float distFromSafeAreaY = (abs(vUv.y - 0.5) - 0.5) / marginHeight;
			float distFromSafeArea;
			if (distFromSafeAreaX < 0.0 && distFromSafeAreaY < 0.0) {
				distFromSafeArea = max(distFromSafeAreaX, distFromSafeAreaY);
			} else {
				distFromSafeArea = length(vec2(max(distFromSafeAreaX, 0.0), max(distFromSafeAreaY, 0.0)));
			}
			distFromSafeArea = smoothstep(0.0, 1.0, sqrt(distFromSafeArea));
			color.a = mix(color.a, 0.0, max(distFromSafeArea, 0.0));

			vec3 bgColor = vec3(0.13333, 0.30980, 0.14510);
			vec3 fakeOpacity = mix(bgColor, color.rgb, color.a);
      pc_fragColor = vec4(fakeOpacity, 1.0);
    }
  `,
)

extend({StaticEffectMaterial})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			staticEffectMaterial: StaticEffectMaterialUniforms & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export default StaticEffectMaterial
