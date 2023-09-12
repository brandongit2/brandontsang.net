import clsx from "clsx"
import Image from "next/image"
import {createElement, lazy} from "react"

import type {QaNode} from "@/components/QaTree/types"

import FramerMotionLogo from "@/components/logo-svgs/FramerMotionLogo"
import NextJsLogo from "@/components/logo-svgs/NextJsLogo"
import ReactLogo from "@/components/logo-svgs/ReactLogo"
import Bg from "@/components/QaTree/Bg"
import NoBr from "@/components/QaTree/NoBr"
import Under from "@/components/QaTree/Under"
import {playfair} from "@/helpers/fonts"
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
			answer: createElement(lazy(() => import(`./AboutMe`))),
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
					answer: createElement(lazy(() => import(`./WhereHaveYouWorked`))),
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
