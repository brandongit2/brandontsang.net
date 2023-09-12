import {Code} from "bright"
import katex from "katex"

import type {QaNode} from "@/components/QaTree/types"

import {
	blobsSvg,
	circleEffects,
	circleGen,
	circleSdf,
	circleSmin,
	columnAnimCss,
	columnAnimHtml,
	fixedWidthCols,
} from "./codeSnippets"
import Bg from "@/components/QaTree/Bg"
import Cde from "@/components/QaTree/Cde"

export const hemlaneMarketingQaTree: QaNode = {
	question: `What is SprintZero?`,
	answer: (
		<p className="indent-0">
			The page has a <Bg>dynamic layout</Bg>, with a panel that slides out from the right. In the background is a lava
			lamp-inspired effect, created in <Bg>WebGL</Bg>. When viewed on a mobile device, the the sliding panel is replaced
			with an interaction that resembles opening and closing iPhone apps.
		</p>
	),
	furtherQuestions: [
		{
			question: `How did you make the lava lamp effect?`,
			answer: (
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
						channel. That <Cde>&lt;feColorMatrix&gt;</Cde> (if you&apos;re familiar with matrix transformations) takes
						the RGBA value of the colour, and performs{` `}
						<span dangerouslySetInnerHTML={{__html: katex.renderToString(`a\\coloneqq 19a-9`, {output: `html`})}} /> to
						basically make the blur sharp again, but further out than the original shape&apos;s boundary.
					</p>
					<p>
						But this time around, <Bg>I wanted to do better</Bg>. SVG filters aren&apos;t known for their performance,
						and I was wanting to try out GLSL shaders anyway. So I did a ton of experimenting in my free time, and
						eventually I settled on the following:
					</p>
				</>
			),
			furtherQuestions: [
				{
					question: `Show me the code!`,
					answer: (
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
								And then, using a <Cde>smoothMin()</Cde> function I found on the web, smooth the crap out of all the
								circles, every one with respect to every other:
							</p>
							<div className="-my-3.5 max-w-[calc(100vw-2.25rem)] text-sm leading-[normal]">
								<Code lang="glsl">{circleSmin}</Code>
							</div>
							<p>
								That generates the base shape of the blob effect. From there, I apply effects like darkening the blobs
								around the edges, and applying shadows, taking advantage of the SDF:
							</p>
							<div className="-my-3.5 max-w-[calc(100vw-2.25rem)] text-sm leading-[normal]">
								<Code lang="glsl">{circleEffects}</Code>
							</div>
							<p>
								And that&apos;s it! Surprisingly the performance was good straight out of the box, even though my code
								was pretty crude in retrospect. This was <Bg>my first time</Bg> making effects in GLSL, and I&apos;m
								pretty happy with what I achieved. I&apos;ve been practicing more with shaders since then, and I
								actually used them for the animated masthead on the main page! In the future I hope to use my shader
								skills to make something more than just decorative.
							</p>
						</>
					),
				},
			],
		},
		{
			question: `Tell me about the desktop layout.`,
			answer: (
				<p>
					As for the page itself, the marketing team came to me with a concept of creating groups from the target
					audience, and segmenting the messaging per-group. The idea of the page then was for information to start broad
					on the left, and become more specific on the right. Together, we arrived on the layout you see in the gallery.
					The lava lamp effect was added by myself after a bit of personal experimenting with WebGL.
				</p>
			),
			furtherQuestions: [
				{
					question: `How did you make the dynamic panels?`,
					answer: (
						<>
							<p>
								The first approach was to put the three columns into a CSS grid, which worked fine, except I realized
								that grid column lines cannot be transitioned. Flexbox <Cde>grow</Cde> values, as I would later find
								out, could in fact be transitioned. And that was the revelation that allowed me to implement the final
								design <span className="text-sm opacity-50">(and made me very happy when I discovered it)</span>.
							</p>
							<p>
								So each column gets a <Cde>grow</Cde> value, and that value is set to <Cde>0</Cde> when the column is
								closed:
							</p>
							<div className="-my-3.5 max-w-[calc(100vw-2.25rem)] text-sm leading-[normal]">
								<Code lang="html" title="HTML">
									{columnAnimHtml}
								</Code>
								<Code lang="scss" title="SCSS">
									{columnAnimCss}
								</Code>
							</div>
						</>
					),
					furtherQuestions: [
						{
							question: `Doesn't the content reflow a bunch during the transition?`,
							answer: (
								<>
									<p>
										The problem with this is that while the panels are transitioning, their widths are constantly
										changing, leading to a ton of ugly content reflowing. This was solved using JavaScript to measure
										the width of the page, and apportioning the widths among the columns. So the columns change width,
										but the content within them stays at their full width.
									</p>
									<div className="-my-3.5 max-w-[calc(100vw-2.25rem)] text-sm leading-[normal]">
										<Code lang="tsx">{fixedWidthCols}</Code>
									</div>
								</>
							),
						},
					],
				},
			],
		},
		{
			question: `Tell me about the mobile layout.`,
			answer: (
				<>
					<p>
						The panels require way more screen space than is given by mobile devices, so I had to come up with a new
						interaction for phones. The plan, then, was to present the panel content in a pop-up modal. But it
						didn&apos;t feel as cool as the sliding motion found in the desktop layout. So I went ahead and implemented
						an interaction inspired by the iOS app switcher.
					</p>
					<p>
						I always thought interactions on iOS were implemented so flawlessly and naturally, and I don&apos;t recall
						seeing anything of that nature anywhere else: not on the web, not on Android, not on the desktop. I wanted
						to know why, and whether or not I could change that.
					</p>
					<p className="indent-0">The implementation can be broken down into several pieces:</p>
					<div className="mx-auto w-max rounded-2xl border border-text/40 bg-black/30 px-6 py-4">
						<ol className="flex flex-col gap-2">
							<li>
								<span className="font-karrik mr-2 inline-block w-6 text-right text-2xl leading-none [font-feature-settings:'lnum']">
									1.{` `}
								</span>
								the transition from the button to the opened dialog;
							</li>
							<li>
								<span className="font-karrik mr-2 inline-block w-6 text-right text-2xl leading-none [font-feature-settings:'lnum']">
									2.{` `}
								</span>
								a grab gesture for the dialog&apos;s handle;
							</li>
							<li>
								<span className="font-karrik mr-2 inline-block w-6 text-right text-2xl leading-none [font-feature-settings:'lnum']">
									3.{` `}
								</span>
								detection of left-right swipe and upward swipe gestures;
							</li>
							<li>
								<span className="font-karrik mr-2 inline-block w-6 text-right text-2xl leading-none [font-feature-settings:'lnum']">
									4.{` `}
								</span>
								the transition between two dialog pages;
							</li>
							<li>
								<span className="font-karrik mr-2 inline-block w-6 text-right text-2xl leading-none [font-feature-settings:'lnum']">
									5.{` `}
								</span>
								and the transition from the dialog back to the button.
							</li>
						</ol>
					</div>
					<p>
						Items <span className="font-karrik text-lg">1</span> and{` `}
						<span className="font-karrik text-lg">5</span> were simple enough; I just used Framer Motion to perform a
						layout transition. But the other three items were much more complex to build.
					</p>
					<p className="font-bold">I&apos;m still in the middle of writing this; more to come!</p>
				</>
			),
		},
	],
}
