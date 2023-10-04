"use client"

import {motion} from "framer-motion"
import {enableMapSet, produce} from "immer"
import Image from "next/image"
import {useState} from "react"

import FramerMotionLogo from "@/components/logo-svgs/FramerMotionLogo"
import NextJsLogo from "@/components/logo-svgs/NextJsLogo"
import ReactLogo from "@/components/logo-svgs/ReactLogo"
import Bg from "@/components/QaTree/Bg"
import Cde from "@/components/QaTree/Cde"
import Under from "@/components/QaTree/Under"
import cloudFirestoreLogo from "@public/logos/cloud-firestore.png"
import typescriptLogo from "@public/logos/typescript.png"

enableMapSet()

export default function WhatTechnologies() {
	const [expandedPanels, setExpandedPanels] = useState<Set<number>>(new Set())

	return (
		<motion.div layout="position">
			<p className="indent-0">Here&apos;s a partial list of technologies I used to build SprintZero:</p>
			<ul className="mt-2 list-inside list-disc pl-4 text-lg [&_p:not(.specificity)]:indent-0">
				<motion.li layout="position">
					<div className="inline">
						<div className="w-1.2 inline-flex translate-y-0.5 justify-center align-baseline">
							<Image
								src={typescriptLogo}
								alt=""
								className="h-auto w-[1.1em]"
								style={{filter: `drop-shadow(rgb(0 0 0 / 0.4) 0px 0px 4px)`}}
							/>
						</div>
						{` `}
						<span className="mx-1 font-medium">TypeScript</span>
						{` `}
						<button
							type="button"
							className="text-xs underline opacity-60"
							onClick={() =>
								setExpandedPanels(
									produce((panels) => {
										if (panels.has(0)) panels.delete(0)
										else panels.add(0)
									}),
								)
							}
						>
							{expandedPanels.has(0) ? `(see less)` : `(see more)`}
						</button>
					</div>
					{expandedPanels.has(0) && (
						<div className="relative flex items-stretch text-base">
							<div className="my-2 ml-[34px] mr-[18px] w-px shrink-0 bg-white/60" />
							<p className="mb-4 mt-2 min-w-0 grow">
								Pretty much everything I code is in TypeScript these days. I led a migration from JavaScript to
								TypeScript in the SprintZero codebase. As part of a project-wide renovation, I saw the opportunity to
								{` `}
								<Bg>drastically reduce the fragility</Bg> of the code. Before I worked on the project, several other
								developers had each had a go at building different parts of the app. And when one developer leaves, they
								take with them the conventions and knowledge they had accrued. TypeScript serves as{` `}
								<Bg>implicit code documentation</Bg>, lessening the impact of knowledge loss. It also makes the code
								more robust, and the speed of development faster.
							</p>
						</div>
					)}
				</motion.li>
				<motion.li layout="position">
					<div className="w-1.2 inline-flex translate-y-0.5 justify-center align-baseline">
						<ReactLogo
							className="h-[1.2em] w-[1.2em]"
							style={{
								filter: `drop-shadow(rgb(0 0 0 / 0.3) 0px 0px 10px) drop-shadow(rgb(0 0 0 / 1) 0px 0px 1px) drop-shadow(black 0px 0px 1px)`,
							}}
						/>
					</div>
					{` `}
					<span className="mx-1 font-medium">React</span>
					{` `}
					<button
						type="button"
						className="text-xs underline opacity-60"
						onClick={() =>
							setExpandedPanels(
								produce((panels) => {
									if (panels.has(1)) panels.delete(1)
									else panels.add(1)
								}),
							)
						}
					>
						{expandedPanels.has(1) ? `(see less)` : `(see more)`}
					</button>
					{expandedPanels.has(1) && (
						<div className="relative flex items-stretch text-base">
							<div className="my-2 ml-[34px] mr-[18px] w-px shrink-0 bg-white/60" />
							<div className="mb-4 mt-2 flex grow flex-col gap-2">
								<p>
									React has been my go-to since day one. For the <Bg>nearly five years</Bg> I&apos;ve been using it,
									there has never been a time when I tried to do something it wasn&apos;t capable of. This is thanks in
									large part to the{` `}
									<strong className="font-semibold">extensive ecosystem</strong> of libraries built around it. I think
									that one of the big reasons React has been around so{` `}
									<span className="opacity-50">(comparatively)</span> long is that the ecosystem allows the entire
									development community as a whole to determine{` `}
									<em>what React is</em>. By picking and choosing different libraries to use with React over time, React
									can stay the exact same, but{` `}
									<Under>how we use it is able to evolve with our ever-changing needs.</Under>
								</p>
								<p>
									And now with the introduction of <Bg>React Server Components</Bg>, React is making another huge leap.
									We took advantage of Server Components with Next.js&nbsp;13 in SprintZero, and the experience was
									amazing. Although we didn&apos;t do much data fetching ourselves because of Cloud Firestore, giving
									some components direct access to the back-end&mdash;not to mention allowing them to be{` `}
									<Cde>async</Cde>
									&mdash;was an{` `}
									<Bg>honest game-changer</Bg> in the development and user experiences.
								</p>
							</div>
						</div>
					)}
				</motion.li>
				<motion.li layout="position">
					<div className="w-1.2 inline-flex translate-y-0.5 justify-center align-baseline">
						<NextJsLogo className="h-[1.1em] w-[1.2em]" style={{filter: `drop-shadow(rgb(0 0 0 / 0.4) 0px 0px 4px)`}} />
					</div>
					{` `}
					<span className="mx-1 font-medium">Next.js</span>
					{` `}
					<button
						type="button"
						className="text-xs underline opacity-60"
						onClick={() =>
							setExpandedPanels(
								produce((panels) => {
									if (panels.has(2)) panels.delete(2)
									else panels.add(2)
								}),
							)
						}
					>
						{expandedPanels.has(2) ? `(see less)` : `(see more)`}
					</button>
					{expandedPanels.has(2) && (
						<div className="relative flex items-stretch text-base">
							<div className="my-2 ml-[34px] mr-[18px] w-px shrink-0 bg-white/60" />
							<div className="mb-4 mt-2 flex grow flex-col gap-2">
								<p>
									I still remember the age of React development where you had to stick with the limitations of
									{` `}
									<span className="font-normal text-[color-mix(in_srgb,oklch(90%_0.157_110.543),oklch(0.2_1_0)_40%)]">
										Create React App&nbsp;🪦
									</span>
									, or jump 500&nbsp;m straight into the horrors of Webpack configuration. I began using Next.js in 2018
									solely because I didn&apos;t want to set up the bundling and preprocessing myself.
								</p>
								<p>
									But since then, Next.js has become so much more than that. It pioneered the art of{` `}
									<strong className="font-semibold text-[color-mix(in_srgb,oklch(90%_0.157_110.543),oklch(0.45_1_120)_40%)]">
										server-side rendering
									</strong>
									{` `}
									in React, employed a ridiculously simple but powerful{` `}
									<strong className="font-semibold text-[color-mix(in_srgb,oklch(90%_0.157_110.543),oklch(0.45_1_120)_40%)]">
										file-based routing
									</strong>
									{` `}
									system, and brought{` `}
									<strong className="font-semibold text-[color-mix(in_srgb,oklch(90%_0.157_110.543),oklch(0.45_1_120)_40%)]">
										hot module reload
									</strong>
									{` `}
									(HMR) to the masses. Now with the introduction of Next.js&nbsp;13, it has{` `}
									<Bg>completely overhauled</Bg> its routing system, allowing for things complex routing techniques and
									animated route transitions. Not to mention, Vercel&mdash;the creators of Next.js&mdash;have partnered
									with the React team to help build out and{` `}
									<Bg>take full advantage</Bg> of React Server Components.
								</p>
							</div>
						</div>
					)}
				</motion.li>
				<motion.li layout="position">
					<div className="w-1.2 inline-flex translate-y-0.5 justify-center align-baseline">
						<Image
							src={cloudFirestoreLogo}
							alt=""
							className="h-auto w-[1em] translate-x-[3px]"
							style={{filter: `drop-shadow(rgb(0 0 0 / 0.4) 0px 0px 4px)`}}
						/>
					</div>
					{` `}
					<span className="mx-1 font-medium">Cloud Firestore</span>
					{` `}
					<button
						type="button"
						className="text-xs underline opacity-60"
						onClick={() =>
							setExpandedPanels(
								produce((panels) => {
									if (panels.has(3)) panels.delete(3)
									else panels.add(3)
								}),
							)
						}
					>
						{expandedPanels.has(3) ? `(see less)` : `(see more)`}
					</button>
					{expandedPanels.has(3) && (
						<div className="relative flex items-stretch text-base">
							<div className="my-2 ml-[34px] mr-[18px] w-px shrink-0 bg-white/60" />
							<div className="mb-4 mt-2 flex grow flex-col gap-2">
								<p>
									Developer resources were quite strained on this project. We ultimately had to focus our efforts on the
									front-end since that had the most impact on the user. We obviously couldn&apos;t skimp on the back-end
									either, and that&apos;s where{` `}
									<strong className="font-semibold">Firebase</strong>, specifically{` `}
									<strong className="font-semibold">Cloud Firestore</strong>, comes in.
								</p>
								<p>
									Cloud Firestore provides <Bg>much more than a database</Bg>; it is also a solution for{` `}
									<Under>querying the database</Under>, pushing and listening for{` `}
									<Under>real-time updates</Under>, making updates{` `}
									<Under>optimistically</Under>, and even{` `}
									<Under>RBAC</Under>
									{` `}
									<span className="text-sm opacity-50">(role-based access control)</span>.
								</p>
							</div>
						</div>
					)}
				</motion.li>
				<motion.li layout="position">
					<div className="w-1.2 inline-flex translate-y-0.5 justify-center align-baseline">
						<FramerMotionLogo
							className="h-[1.1em] w-[1.2em]"
							style={{filter: `drop-shadow(rgb(0 0 0 / 0.4) 0px 0px 4px)`}}
						/>
					</div>
					{` `}
					<span className="mx-1 font-medium">Framer Motion</span>
					{` `}
					<button
						type="button"
						className="text-xs underline opacity-60"
						onClick={() =>
							setExpandedPanels(
								produce((panels) => {
									if (panels.has(4)) panels.delete(4)
									else panels.add(4)
								}),
							)
						}
					>
						{expandedPanels.has(4) ? `(see less)` : `(see more)`}
					</button>
					{expandedPanels.has(4) && (
						<div className="relative flex items-stretch text-base">
							<div className="my-2 ml-[34px] mr-[18px] w-px shrink-0 bg-white/60" />
							<div className="mb-4 mt-2 flex grow flex-col gap-2">
								<p>
									Last but not least, probably my favourite library of all time.{` `}
									<strong className="font-semibold">Framer Motion</strong> is a React animation library that practically
									enables <Bg>real-life magic</Bg>.{` `}
									<strong className="font-semibold">Layout animations</strong> enable elements to{` `}
									<em>automatically</em>&nbsp;🧙 animate their position when the CSS layout changes; components can
									{` `}
									<Under>maintain their identity</Under>
									{` `}
									and animate between <Under>completely separate parts</Under> of the DOM; you can define{` `}
									<Under>your own animating values</Under>
									{` `}
									<span className="opacity-50">(as plain numbers and even interpolated CSS strings!!!)</span>
									{` `}
									and imperatively animate them... It&apos;s hard to explain the amount of flexibility and power this
									library affords me as an animation-hungry web developer.
								</p>
								<p>
									And of course, this library was used substantially throughout SprintZero, in parts{` `}
									<Bg>enabling actual functionality</Bg> that was crucial to the app&apos;s workflow.
								</p>
							</div>
						</div>
					)}
				</motion.li>
			</ul>
		</motion.div>
	)
}
