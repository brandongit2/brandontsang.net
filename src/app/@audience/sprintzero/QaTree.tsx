import {enableMapSet, produce} from "immer"
import Image from "next/image"
import {useState, type ReactNode} from "react"

import Bg from "./Bg"
import FramerMotionLogo from "./FramerMotionLogo"
import NextJsLogo from "./NextJsLogo"
import ReactLogo from "./ReactLogo"
import cloudFirestoreLogo from "@public/icons/cloud-firestore.png"
import sprintZeroLogo from "@public/icons/sprintzero.png"
import typescriptLogo from "@public/icons/typescript.png"

enableMapSet()

export type QABlock = {
	question: string
	answer: ReactNode | (() => ReactNode)
	furtherQuestions?: QABlock[]
}

export const QaTree: QABlock = {
	question: `What is SprintZero?`,
	answer: (
		<p className="text-justify">
			<Image
				src={sprintZeroLogo}
				alt=""
				className="inline-block h-auto w-[1.1em] translate-y-0.5 align-baseline"
				style={{filter: `drop-shadow(rgb(0 0 0 / 0.4) 0px 0px 4px)`}}
			/>
			{` `}
			<strong className="font-bold">SprintZero</strong> is a project management app I was contracted as an engineer to
			build late last year.
		</p>
	),
	furtherQuestions: [
		{
			question: `Tell me more about the product.`,
			answer: (
				<div className="flex flex-col gap-2 text-justify">
					<p className="indent-8">
						The key feature of the project was a unique tool known as the Story Map. The Story Map organized all user
						stories of the project into groups called <em>features</em>, and those into groups called <em>epics</em>.
						The result was a three-tier tree structure, as you can see in the gallery to the left.
					</p>
					<p className="indent-8">
						Users were able to <Bg>freely rearrange the tree</Bg>, changing the order of stories, features, and epics,
						as well as moving them up and down between different tiers. Moreover, updates to the tree would propagate
						{` `}
						<Bg>in real-time</Bg> to other team members. The idea was to enable the team to rapidly adjust to changing
						product needs, embracing the dynamic and agile management of tickets.
					</p>
				</div>
			),
			furtherQuestions: [
				{
					question: `How did you implement that?`,
					answer: (
						<p>
							Implementing the Story Map required significant knowledge of DOM measurement and manipulation. To move
							items around the tree meant I had to handle the drag-and-drop all while the DOM element itself was
							constantly being destroyed and recreated by React. Thankfully, there&apos;s a library called{` `}
							<Bg>Framer Motion</Bg>
							{` `}
							which does a lot of the heavy lifting when moving React components around the DOM. I was able to use it to
							create a seamless drag-and-drop experience.
						</p>
					),
					furtherQuestions: [
						{
							question: `Wow, that sounds complicated. How did you store the state of the tree?`,
							answer: (
								<p>
									Managing the state of the tree was a big challenge. After a lot of trial-and-error, I settled on
									having a flat data structure, where every item simply keeps a record of its parent. This technique,
									called <Bg>&ldquo;normalization&rdquo;</Bg>, was remarkably simple to traverse and manipulate. When
									combined with a big list of utility functions for operating on the tree, it became practically
									impossible to corrupt the story map&apos;s structure.
								</p>
							),
						},
						{
							question: `You said changes would update in real-time? How did you do that?`,
							answer: (
								<p>
									The real-time updates were possible using Firebase&apos;s <Bg>Cloud Firestore</Bg> database. Cloud
									Firestore is a NoSQL database that&apos;s well-known for its real-time capabilities, meaning it can
									push updates to all users of a document instantly, resolving conflicts and even handling offline
									changes. I did still have to manage conflicts from reconciling Cloud Firestore&apos;s state with the
									user&apos;s local state, but my big utility function list made that a breeze. We used Cloud
									Firestore&apos;s real-time updates to enable collaborative editing{` `}
									<Bg>throughout almost the entire app</Bg>. It&apos;s one of my favourite things about SprintZero.
								</p>
							),
						},
					],
				},
				{
					question: `What technologies did you use?`,
					answer: function TechnologiesAnswer() {
						const [expandedPanels, setExpandedPanels] = useState<Set<number>>(new Set())

						return (
							<div>
								<p>Here&apos;s a partial list of technologies I used to build SprintZero:</p>
								<ul className="mt-2 list-inside list-disc pl-4 text-lg">
									<li>
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
												<p className="min-w-0 grow font-extralight leading-snug tracking-wide">
													Pretty much everything I code is in TypeScript these days. I led a migration from JavaScript
													to TypeScript in the SprintZero codebase. As part of a project-wide renovation, I saw the
													opportunity to <Bg>drastically improve the fragility</Bg> of the code. Before I worked on the
													project, several other developers had each had a go at building different parts of the app.
													And when one developer leaves, they take with them the conventions and knowledge they had
													accrued. TypeScript serves as <Bg>implicit code documentation</Bg>, lessening the impact of
													knowledge loss. It also makes the code more robust, and the speed of development faster.
												</p>
											</div>
										)}
									</li>
									<li>
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
											(see {expandedPanels.has(1) ? `less` : `more`})
										</button>
									</li>
									<li>
										<div className="w-1.2 inline-flex translate-y-0.5 justify-center align-baseline">
											<NextJsLogo
												className="h-[1.1em] w-[1.2em]"
												style={{filter: `drop-shadow(rgb(0 0 0 / 0.4) 0px 0px 4px)`}}
											/>
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
											(see {expandedPanels.has(2) ? `less` : `more`})
										</button>
									</li>
									<li>
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
														if (panels.has(0)) panels.delete(0)
														else panels.add(0)
													}),
												)
											}
										>
											(see more)
										</button>
									</li>
									<li>
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
														if (panels.has(2)) panels.delete(2)
														else panels.add(2)
													}),
												)
											}
										>
											(see more)
										</button>
									</li>
								</ul>
							</div>
						)
					},
				},
			],
		},
		{
			question: `Who did you work with on the project?`,
			answer: (
				<p>
					My involvement with the project began when the founder, whom I knew from a previous company I had worked at,
					contacted me one day to see if I could help build out the story map feature. I ended up working very closely
					with him; he played the role of product designer, and I was the primary engineer on the project. Besides the
					founder, he had a co-founder who was also a senior developer. However his background was mainly in
					Java/enterprise, so his contribution was primarily technical/backend guidance. There was also a junior
					developer, but worked part-time and his contribution was largely tangential to mine. I did collaborate with
					both on several occasions, but a bulk of the project was engineered by me.
				</p>
			),
		},
		{
			question: `Where can I see the project?`,
			answer: (
				<p>
					The project is available for free use at{` `}
					<a
						href="https://web.sprintzero.app"
						target="_blank"
						rel="noreferrer"
						className="text-[oklch(0.92_0.16_110.54)] underline decoration-2 underline-offset-2"
					>
						https://web.sprintzero.app
					</a>
					. Unfortunately, the founder was having trouble securing funding and we were forced to stop work before we
					reached full stability, so expect occasional issues when using the app.
				</p>
			),
		},
	],
}
