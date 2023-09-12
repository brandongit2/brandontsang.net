import Image from "next/image"
import {createElement, lazy} from "react"

import type {QaNode} from "@/components/QaTree/types"

import Bg from "@/components/QaTree/Bg"
import NoBr from "@/components/QaTree/NoBr"
import Under from "@/components/QaTree/Under"
import sprintZeroLogo from "@public/logos/sprintzero.png"

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
					answer: createElement(lazy(() => import(`./WhatTechnologies`))),
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
