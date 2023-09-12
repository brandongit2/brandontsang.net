import {Code} from "bright"
import katex from "katex"

import {blobsSvg} from "./codeSnippets"
import Bg from "@/components/QaTree/Bg"
import Cde from "@/components/QaTree/Cde"

export default function LavaLampEffect() {
	return (
		<>
			<p>
				The lava lamp effect had been in my head for forever. I had actually done an early version of the lava lamp
				effect back in high school, when I discovered a method to create &ldquo;blobs&rdquo; with SVG filters:
			</p>
			<div className="-my-3.5 max-w-[calc(100vw-2.25rem)] text-sm leading-[normal]">
				<Code lang="xml">{blobsSvg}</Code>
			</div>
			<p>
				Essentially what this does is take the input image, blurs it, then applies a heavy multiplier to the alpha
				channel. That <Cde>&lt;feColorMatrix&gt;</Cde> (if you&apos;re familiar with matrix transformations) takes the
				RGBA value of the colour, and performs{` `}
				<span dangerouslySetInnerHTML={{__html: katex.renderToString(`a\\coloneqq 19a-9`, {output: `html`})}} /> to
				basically make the blur sharp again, but further out than the original shape&apos;s boundary.
			</p>
			<p>
				But this time around, <Bg>I wanted to do better</Bg>. SVG filters aren&apos;t known for their performance, and I
				was wanting to try out GLSL shaders anyway. So I did a ton of experimenting in my free time, and eventually I
				settled on the following:
			</p>
		</>
	)
}
