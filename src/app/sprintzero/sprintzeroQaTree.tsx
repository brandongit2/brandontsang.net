"use client"

import {motion} from "framer-motion"
import {enableMapSet, produce} from "immer"
import Image from "next/image"
import {useState} from "react"

import type {QaNode} from "@/components/QaTree/types"

import FramerMotionLogo from "@/components/logo-svgs/FramerMotionLogo"
import NextJsLogo from "@/components/logo-svgs/NextJsLogo"
import ReactLogo from "@/components/logo-svgs/ReactLogo"
import Bg from "@/components/QaTree/Bg"
import Cde from "@/components/QaTree/Cde"
import NoBr from "@/components/QaTree/NoBr"
import Under from "@/components/QaTree/Under"
import cloudFirestoreLogo from "@public/logos/cloud-firestore.png"
import sprintZeroLogo from "@public/logos/sprintzero.png"
import typescriptLogo from "@public/logos/typescript.png"

enableMapSet()

export const sprintzeroQaTree: QaNode = {
	question: `What is SprintZero?`,
	answer: (
		<p className="indent-0">
			<NoBr>
				<Image
					src={sprintZeroLogo}
					alt=""
					className="mr-1 inline-block h-[1em] w-auto translate-y-0.5 align-baseline"
					style={{filter: `drop-shadow(rgb(0 0 0 / 0.4) 0px 0px 4px)`}}
				/>
				<strong className="font-bold">SprintZero</strong>
			</NoBr>
			{` `}
			is a project management app I was contracted as an engineer to build late last year.
		</p>
	),
	furtherQuestions: [
		{
			question: `Tell me more about the product.`,
			answer: (
				<>
					<p>
						The key feature of the project was a unique tool known as the{` `}
						<strong className="font-semibold">Story&nbsp;Map</strong>. The Story&nbsp;Map organized all user stories of
						the project into groups called <em>features</em>, and those into groups called{` `}
						<em>epics</em>. The result was a three-tier tree structure, as you can see in the gallery above.
					</p>
					<p>
						Users were able to <Bg>freely rearrange the tree</Bg>, changing the order of stories, features, and epics,
						as well as moving them up and down between different tiers. Moreover, updates to the tree would propagate
						{` `}
						<Bg>in real-time</Bg> to other team members. The idea was to enable the team to rapidly adjust to changing
						product needs, embracing the dynamic and agile management of tickets.
					</p>
				</>
			),
			furtherQuestions: [
				{
					question: `How did you implement that?`,
					answer: (
						<p>
							Implementing the Story&nbsp;Map required significant knowledge of DOM measurement and manipulation. To
							move items around the tree meant I had to handle the drag-and-drop all while the DOM element itself was
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
									having a <strong className="font-semibold">flat data structure</strong>, where every item simply keeps
									a record of its parent. This technique, called <Bg>&ldquo;normalization&rdquo;</Bg>, made the tree
									remarkably simple to traverse and manipulate. When combined with a big list of utility functions for
									operating on the tree, it became practically impossible to corrupt the Story Map&apos;s structure.
								</p>
							),
						},
						{
							question: `You said changes would update in real-time? How did you do that?`,
							answer: (
								<p>
									The real-time updates were possible using Firebase&apos;s <Bg>Cloud Firestore</Bg> database. Cloud
									Firestore is a NoSQL database that&apos;s well-known for its real-time capabilities, meaning it can
									push updates to all users of a document <strong className="font-semibold">instantly</strong>,
									resolving conflicts and even <strong className="font-semibold">handling offline changes</strong>. I
									did still have to manage conflicts from reconciling Cloud Firestore&apos;s state with the user&apos;s
									local state, but my big utility function list made that a breeze. We used Cloud Firestore&apos;s
									real-time updates to enable collaborative editing{` `}
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
													Pretty much everything I code is in TypeScript these days. I led a migration from JavaScript
													to TypeScript in the SprintZero codebase. As part of a project-wide renovation, I saw the
													opportunity to <Bg>drastically reduce the fragility</Bg> of the code. Before I worked on the
													project, several other developers had each had a go at building different parts of the app.
													And when one developer leaves, they take with them the conventions and knowledge they had
													accrued. TypeScript serves as <Bg>implicit code documentation</Bg>, lessening the impact of
													knowledge loss. It also makes the code more robust, and the speed of development faster.
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
														React has been my go-to since day one. For the <Bg>nearly five years</Bg> I&apos;ve been
														using it, there has never been a time when I tried to do something it wasn&apos;t capable
														of. This is thanks in large part to the{` `}
														<strong className="font-semibold">extensive ecosystem</strong> of libraries built around it.
														I think that one of the big reasons React has been around so{` `}
														<span className="opacity-50">(comparatively)</span> long is that the ecosystem allows the
														entire development community as a whole to determine{` `}
														<em>what React is</em>. By picking and choosing different libraries to use with React over
														time, React can stay the exact same, but{` `}
														<Under>how we use it is able to evolve with our ever-changing needs.</Under>
													</p>
													<p>
														And now with the introduction of <Bg>React Server Components</Bg>, React is making another
														huge leap. We took advantage of Server Components with Next.js&nbsp;13 in SprintZero, and
														the experience was amazing. Although we didn&apos;t do much data fetching ourselves because
														of Cloud Firestore, giving some components direct access to the backend&mdash;not to mention
														allowing them to be <Cde>async</Cde>&mdash;was an{` `}
														<Bg>honest game-changer</Bg> in the development and user experiences.
													</p>
												</div>
											</div>
										)}
									</motion.li>
									<motion.li layout="position">
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
														, or jump 500&nbsp;m straight into the horrors of Webpack configuration. I began using
														Next.js in 2018 solely because I didn&apos;t want to set up the bundling and preprocessing
														myself.
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
														<Bg>completely overhauled</Bg> its routing system, allowing for things complex routing
														techniques and animated route transitions. Not to mention, Vercel&mdash;the creators of
														Next.js&mdash;have partnered with the React team to help build out and{` `}
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
														Developer resources were quite strained on this project. We ultimately had to focus our
														efforts on the frontend since that had the most impact on the user. We obviously
														couldn&apos;t skimp on the backend either, and that&apos;s where{` `}
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
														<strong className="font-semibold">Framer Motion</strong> is a React animation library that
														practically enables <Bg>real-life magic</Bg>.{` `}
														<strong className="font-semibold">Layout animations</strong> enable elements to{` `}
														<em>automatically</em>&nbsp;🧙 animate their position when the CSS layout changes;
														components can
														{` `}
														<Under>maintain their identity</Under>
														{` `}
														and animate between <Under>completely separate parts</Under> of the DOM; you can define{` `}
														<Under>your own animating values</Under>
														{` `}
														<span className="opacity-50">(as plain numbers and even interpolated CSS strings!!!)</span>
														{` `}
														and imperatively animate them... It&apos;s hard to explain the amount of flexibility and
														power this library affords me as an animation-hungry web developer.
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
					},
				},
			],
		},
		{
			question: `Who did you work with on the project?`,
			answer: (
				<>
					<p>
						I worked primarily and extensively with the founder of the project, who acted as product designer. I knew
						him from a previous company I had worked at, and he contacted me one day to see if I could help build out
						the story map feature. From then, I was the <Bg>primary engineer</Bg> on the project.
					</p>
					<p>
						In addition to the founder, the team included a co-founder whose expertise lies in Java and enterprise
						solutions. His guidance was invaluable on the technical and backend aspects of the project. I also
						collaborated with a junior developer, who worked part-time and contributed in areas that were separate but
						complementary to my own work. While I was the main engineer for a significant portion of the project, it was
						a team effort and each member brought unique skills to the table.
					</p>
				</>
			),
			furtherQuestions: [
				{
					question: `What did you learn from working there?`,
					answer: (
						<>
							<p>
								This project marked the first time my skills have been used to{` `}
								<Bg>extensively build a full-stack application.</Bg> I learned a ton about simply managing work and
								juggling priorities, as well as the amount of effort required from all those involved. It truly was a
								small but tight operation.
							</p>
							<p>
								In addition to the business side of things, my feeling that I had mastered React and the DOM was
								shattered completely. Working on SprintZero challenged me technically in ways I had never been
								challenged before.
							</p>
							<p className="italic">
								&ldquo;How do I do extensive manual DOM manipulation while tolerating React&apos; lifecycle?&rdquo;
							</p>
							<p className="italic">
								&ldquo;I&apos;m pushing the limits of what&apos;s possible with the current architecutre. Do I really
								have to refactor again?&rdquo;
							</p>
							<p>
								At times the tasks remaining seemed insurmountable, but time passed and things magically started
								working. And after a couple months, the project was already near completion.
							</p>
							<p>
								Working on a project with such tight deadlines and little resources revealed a lot to me about{` `}
								<Under>how much time can get distorted in your head.</Under> Things that initially seemed quick ended up
								taking forever, and then after they were over, I was amazed at how quickly it was finished. My time at
								SprintZero was the ultimate contrast to my time at Hemlane, and{` `}
								<span className="font-semibold">I&apos;m ultimately grateful that I was able to experience both.</span>
							</p>
						</>
					),
				},
			],
		},
		{
			question: `Where can I see the project?`,
			answer: (
				<>
					<p className="indent-0">
						The project is available for free use at:
						<br />
						<span className="mt-4 inline-flex w-full justify-center text-center">
							<a
								href="https://web.sprintzero.app"
								target="_blank"
								rel="noreferrer"
								className="rounded-md border border-text/30 bg-[oklch(0.2_0.5_115/0.8)] px-4 py-1 text-sm font-bold text-[oklch(0.92_0.16_110.54)] underline underline-offset-2"
							>
								https://web.sprintzero.app
							</a>
						</span>
					</p>
					<p>
						Unfortunately, the project ended prematurely before we reached full stability, so expect occasional issues
						when using the app.
					</p>
				</>
			),
		},
	],
}
