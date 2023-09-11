import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

import type {QaNode} from "@/components/QaTree/types"

import FramerMotionLogo from "@/components/logo-svgs/FramerMotionLogo"
import NextJsLogo from "@/components/logo-svgs/NextJsLogo"
import ReactLogo from "@/components/logo-svgs/ReactLogo"
import Bg from "@/components/QaTree/Bg"
import NoBr from "@/components/QaTree/NoBr"
import Under from "@/components/QaTree/Under"
import {computerModern, courier, ft88, playfair} from "@/helpers/fonts"
import hemlaneLogo from "@public/logos/hemlane.png"
import mintbeanLogo from "@public/logos/mintbean.png"
import sprintZeroLogo from "@public/logos/sprintzero.png"
import TailwindCssLogo from "@public/logos/tailwindcss.svg"
import typescriptLogo from "@public/logos/typescript.png"
import TorontoOutline from "@public/toronto.svg"

export const mainPageQaTree: QaNode = {
	question: `Who are you?`,
	answer: (
		<p className="isolate">
			<span className={clsx(playfair.className, `mr-1 text-3xl`)}>Hey!</span>
			{` `}I am a{` `}
			<span className="relative mr-0.5 inline-block h-[2.5em] indent-0 align-[-18px]">
				<TorontoOutline className="relative -z-10 my-[-8px] h-[calc(100%+16px)] rotate-[10deg]" />
				<span className="absolute bottom-0 left-1/2 translate-x-[calc(-50%-4px)] translate-y-[-12px] font-semibold text-bg">
					Toronto
				</span>
			</span>
			-based <Bg>senior frontend web developer</Bg> who loves building <Under>unique</Under> and{` `}
			<Under>challenging</Under> user interfaces.
		</p>
	),
	furtherQuestions: [
		{
			question: `Tell me more about yourself.`,
			answer: (
				<p>
					Some people express themselves through physical art, some through music, some through words&hellip; Well, I do
					it through <span className={clsx(ft88.className)}>pixels on a screen</span>, with{` `}
					<span className={clsx(courier.className, `bg-black px-0.5 pt-1 text-green-400`)}>code</span> and{` `}
					<span className={clsx(computerModern.className, `bg-white/90 px-0.5 text-black`)}>mathematics</span>
					{` `}
					as my tools. I&apos;m drawn by the literally infinite number of things you can make with practically no
					resources but time and practice.
				</p>
			),
			furtherQuestions: [
				{
					question: `What tech do you usually work with?`,
					answer: (
						<>
							<p>
								I practically grew up with the JavaScript ecosystem. Which means my bread and butter include{` `}
								<NoBr>
									<Image src={typescriptLogo} alt="" className="mr-1.5 inline-block h-[1em] w-auto align-[-2px]" />
									<span className="font-semibold">TypeScript</span>
								</NoBr>
								,{` `}
								<NoBr>
									<ReactLogo
										className="align-center mr-1 inline-block h-[0.95em] w-auto align-[-2px]"
										style={{
											filter: `drop-shadow(rgb(0 0 0 / 0.3) 0px 0px 10px) drop-shadow(rgb(0 0 0 / 1) 0px 0px 1px) drop-shadow(black 0px 0px 1px)`,
										}}
									/>
									<span className="font-semibold">React</span>
								</NoBr>
								, and{` `}
								<NoBr>
									<NextJsLogo className="mr-1 inline-block h-[1.1em] w-auto align-[-3px]" />
									<span className="font-semibold">Next.js</span>
								</NoBr>
								. I also love working with{` `}
								<NoBr>
									<TailwindCssLogo className="mr-1 inline-block h-[0.7em] w-auto align-baseline" />
									<span className="font-semibold">TailwindCSS</span>
								</NoBr>
								{` `}
								and{` `}
								<NoBr>
									<FramerMotionLogo className="mr-1 inline-block h-[0.9em] w-auto align-[-2px]" />
									<span className="font-semibold">Framer</span>
								</NoBr>
								<span className="font-semibold"> Motion</span>.
							</p>
							<p>
								My knowledge isn&apos;t limited to just the frontend either; I have loads of experience building out
								{` `}
								<Bg>backends</Bg>, working with <Bg>databases</Bg>, and even a little experience deploying on{` `}
								<Bg>cloud platforms</Bg> and with{` `}
								<Bg>Docker</Bg>.
							</p>
							<p>
								While I may use all the latest, shiniest technologies, I didn&apos;t start out this way at all. My
								fundamentals are rock-solid, having started with just hobby HTML/CSS sites, evolving through JavaScript,
								bundling, TypeScript, all the way through to the modern frameworks of today.{` `}
								<Under>
									I never pick up new things because I hear they&apos;re cool; I only learn new things to solve the
									problems I&apos;m already facing.
								</Under>
							</p>
						</>
					),
				},
				{
					question: `How did you get your start?`,
					answer: (
						<>
							<p>
								I made my first website when I was <span className="font-semibold">13</span>; I had to make a slideshow
								for a school presentation and I wanted to make it look really special. I went all out with transitions
								and interactivity, played with GSAP{` `}
								<span className="text-sm opacity-50">(a JavaScript animation library)</span>, and hardcoded everything
								in a set of HTML files. It was glorious for its time. And probably no one at school cared, but I
								don&apos;t care that no one cared, because I did it for myself, and sometimes that&apos;s all you need
								to keep going.
							</p>
							<p>
								Later on when I was 17, I got hooked on{` `}
								<a href="https://www.khanacademy.org/" target="_blank" rel="noreferrer" className="underline">
									Khan Academy
								</a>
								{` `}
								(a strange thing to get hooked on, I&apos;m sure) and decided I wanted to make my own version of it,
								with a strong emphasis on interactive articles. I also wanted to make a graphing calculator to generate
								really slick-looking visuals. And <Bg>this was how I learned React</Bg>. I honestly didn&apos;t even
								know what it was at the time, I just wanted to be able to re-use my HTML in component form. Anyway of
								course, my plans were too ambitious and the project never materialized. But I{` `}
								<Under>learned a ton</Under> about modern web development, including{` `}
								<span className="font-semibold text-[color-mix(in_srgb,oklch(90%_0.157_110.543),oklch(0.45_1_120)_40%)]">
									bundling
								</span>
								,{` `}
								<span className="font-semibold text-[color-mix(in_srgb,oklch(90%_0.157_110.543),oklch(0.45_1_120)_40%)]">
									my first framework
								</span>
								, and even{` `}
								<span className="font-semibold text-[color-mix(in_srgb,oklch(90%_0.157_110.543),oklch(0.45_1_120)_40%)]">
									user auth
								</span>
								{` `}
								and{` `}
								<span className="font-semibold text-[color-mix(in_srgb,oklch(90%_0.157_110.543),oklch(0.45_1_120)_40%)]">
									how to use a database
								</span>
								. Take it from me, being overly ambitious is the number one way to get really good at something.
							</p>
						</>
					),
				},
				{
					question: `Where have you worked in the past?`,
					answer: (
						<>
							<p>
								My first web development job was at{` `}
								<NoBr>
									<Image
										src={mintbeanLogo}
										alt=""
										className="mr-1 inline-block aspect-square h-[1em] w-auto align-[-2px]"
									/>
									<span className="font-semibold">Mintbean</span>
								</NoBr>
								, which was part <Bg>consulting</Bg> company, part
								{` `}
								<Bg>developer-mentoring</Bg> company. My React familiarity paid off there as I was part of the
								company&apos;s Discord server where I answered tons of questions from entry-level developers, and I
								helped organize community coding events. In fact, I got the job in the first place participating in one
								of these events, where the founder noticed my work and reached out to me. He has since served as a
								helpful mentor and a friend.
							</p>
							<p>
								I then worked at{` `}
								<NoBr>
									<span className="mr-1 inline-block rounded bg-white/90 p-px align-[-3px]">
										<Image src={hemlaneLogo} alt="" className="aspect-square h-[1em] w-auto" />
									</span>
									<span className="font-semibold">Hemlane</span>
								</NoBr>
								, a <Bg>property management SaaS</Bg> company. There, I worked as part of the marketing team as opposed
								to the primary development team. I gave the very small marketing team representation in the site they
								hadn&apos;t had before, and I contributed some of my design experience as well. In addition to these, I
								helped integrate the company&apos;s existing marketing site with{` `}
								<a href="https://www.builder.io/" target="_blank" rel="noreferrer" className="underline">
									Builder.io
								</a>
								, and I began work on a marketing platform to reduce dependence on Zapier and CMSes. It was built on top
								of the extensive data the company had collected since its existence, and would be a major upgrade in the
								marketing workflow, which was up to then very bootstrapped. I had some great experiences at this
								company, and they have a great culture, but it was my first &ldquo;corporate&rdquo; experience. From
								then on I learned that I wasn&apos;t the corporate type; I much prefer to work at smaller, indie-feeling
								companies.
							</p>
							<p>
								My most recent work experience was at{` `}
								<NoBr>
									<Image
										src={sprintZeroLogo}
										alt=""
										className="mr-1 inline-block h-auto w-[1.1em] translate-y-0.5 align-baseline"
										style={{filter: `drop-shadow(rgb(0 0 0 / 0.4) 0px 0px 4px)`}}
									/>
									<span className="font-semibold">SprintZero</span>
								</NoBr>
								, which you can learn all about from my retrospective on the project.{` `}
								<Link
									href="/sprintzero"
									className="align-center mx-1 my-0.5 inline-block rounded-full bg-text px-4 py-1 indent-0 align-[1px] text-xs font-semibold tracking-wider text-black"
									style={{
										backgroundImage: `linear-gradient(2deg, #1e2e00e6, #0d21007a 40%, #00000021 90%, #ffffff61)`,
										boxShadow: `inset -3px -2px 9px rgb(255 255 255 / 0.3), -4px 2px 14px rgb(0 0 0 / 0.3)`,
										textShadow: `oklch(0.99 0.1 114 / 0.3) -1px 1px 1px`,
									}}
								>
									See here →
								</Link>
							</p>
						</>
					),
					furtherQuestions: [
						{
							question: `So where do you want to go from here?`,
							answer: (
								<>
									<p>
										For the past few years, I&apos;ve been divided on whether to delve further into backend work, or
										specialize in frontend for good. That decision is clear as day to me now:{` `}
										<span className="font-semibold">
											<Under>frontend is where I belong</Under>
										</span>
										. I want to keep doing what I&apos;m currently doing, and also expand my skillset by entering{` `}
										<Bg>WebGL development</Bg>, <Bg>graphics programming</Bg>, and <Bg>native mobile development</Bg>. I
										want to work with others who are as passionate and dedicated as I am, and I want to work on projects
										which push the limits of what I&apos;m capable of.
									</p>
									<p>
										I particularly want to work with <Bg>Swift/SwiftUI</Bg> and <Bg>Metal</Bg>, because it&apos;s my
										impression that they have great developer experience, and it sounds very nice to not have to work
										with CSS for a bit.
									</p>
								</>
							),
						},
					],
				},
				{
					question: `Are you looking for work?`,
					answer: (
						<>
							<p>
								<span className="inline-block translate-y-0.5 text-xl">😀</span> And of course I&apos;m looking for
								work!! If you think my skills will be an asset to you or your company, please don&apos;t hesitate to
								reach out to me at{` `}
								<a href="mailto:brandononline2@gmail.com" className="underline">
									brandononline2
									<wbr />
									@gmail.com
								</a>
								. I&apos;d love to elaborate on my background, and talk about where I could fit in on your projects.
							</p>
							<p>
								You can also find a PDF of my résumé{` `}
								<a href="/techresume2023.pdf" target="_blank" className="mr-px font-semibold underline">
									here
								</a>
								.
							</p>
						</>
					),
				},
			],
		},
	],
}
