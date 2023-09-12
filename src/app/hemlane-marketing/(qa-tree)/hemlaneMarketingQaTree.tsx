import {createElement, lazy} from "react"

import type {QaNode} from "@/components/QaTree/types"

import Bg from "@/components/QaTree/Bg"

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
			answer: createElement(lazy(() => import(`./LavaLampEffect`))),
			furtherQuestions: [
				{
					question: `Show me the code!`,
					answer: createElement(lazy(() => import(`./LavaLampEffectCode`))),
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
					answer: createElement(lazy(() => import(`./DesktopDynamicPanels`))),
					furtherQuestions: [
						{
							question: `Doesn't the content reflow a bunch during the transition?`,
							answer: createElement(lazy(() => import(`./DesktopDynamicPanelsReflow`))),
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
					<div className="mx-auto w-fit rounded-2xl border border-text/40 bg-black/30 px-6 py-4">
						<ol className="flex flex-col gap-2">
							<li className="flex gap-2">
								<span className="w-6 shrink-0 basis-6 text-right font-karrik text-2xl leading-none [font-feature-settings:'lnum']">
									1.{` `}
								</span>
								the transition from the button to the opened dialog;
							</li>
							<li className="flex gap-2">
								<span className="w-6 shrink-0 basis-6 text-right font-karrik text-2xl leading-none [font-feature-settings:'lnum']">
									2.{` `}
								</span>
								a grab gesture for the dialog&apos;s handle;
							</li>
							<li className="flex gap-2">
								<span className="w-6 shrink-0 basis-6 text-right font-karrik text-2xl leading-none [font-feature-settings:'lnum']">
									3.{` `}
								</span>
								detection of left-right swipe and upward swipe gestures;
							</li>
							<li className="flex gap-2">
								<span className="w-6 shrink-0 basis-6 text-right font-karrik text-2xl leading-none [font-feature-settings:'lnum']">
									4.{` `}
								</span>
								the transition between two dialog pages;
							</li>
							<li className="flex gap-2">
								<span className="w-6 shrink-0 basis-6 text-right font-karrik text-2xl leading-none [font-feature-settings:'lnum']">
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
