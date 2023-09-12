import {Code} from "bright"

import {circleEffects, circleGen, circleSdf, circleSmin} from "./codeSnippets"
import Bg from "@/components/QaTree/Bg"
import Cde from "@/components/QaTree/Cde"

export default function LavaLampEffectCode() {
	return (
		<>
			<p>
				Get a{` `}
				<a
					href="https://en.wikipedia.org/wiki/Signed_distance_function"
					target="_blank"
					rel="noreferrer"
					className="underline"
				>
					signed distance function (SDF)
				</a>
				{` `}
				for a circle:
			</p>
			<div className="-my-3.5 max-w-[calc(100vw-2.25rem)] text-sm leading-[normal]">
				<Code lang="glsl">{circleSdf}</Code>
			</div>
			<p>
				Generate a bunch of them <span className="opacity-50">(repetition = performance in GPU shaders!)</span>:
			</p>
			<div className="-my-3.5 max-w-[calc(100vw-2.25rem)] text-sm leading-[normal]">
				<Code lang="glsl">{circleGen}</Code>
			</div>
			<p>
				And then, using a <Cde>smoothMin()</Cde> function I found on the web, smooth the crap out of all the circles,
				every one with respect to every other:
			</p>
			<div className="-my-3.5 max-w-[calc(100vw-2.25rem)] text-sm leading-[normal]">
				<Code lang="glsl">{circleSmin}</Code>
			</div>
			<p>
				That generates the base shape of the blob effect. From there, I apply effects like darkening the blobs around
				the edges, and applying shadows, taking advantage of the SDF:
			</p>
			<div className="-my-3.5 max-w-[calc(100vw-2.25rem)] text-sm leading-[normal]">
				<Code lang="glsl">{circleEffects}</Code>
			</div>
			<p>
				And that&apos;s it! Surprisingly the performance was good straight out of the box, even though my code was
				pretty crude in retrospect. This was <Bg>my first time</Bg> making effects in GLSL, and I&apos;m pretty happy
				with what I achieved. I&apos;ve been practicing more with shaders since then, and I actually used them for the
				animated masthead on the main page! In the future I hope to use my shader skills to make something more than
				just decorative.
			</p>
		</>
	)
}
