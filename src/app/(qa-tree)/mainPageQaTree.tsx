import clsx from "clsx"
import {createElement, lazy} from "react"

import type {QaNode} from "@/components/QaTree/types"

import WhatTech from "./WhatTech"
import Bg from "@/components/QaTree/Bg"
import Bold from "@/components/QaTree/Bold"
import Under from "@/components/QaTree/Under"
import {playfair} from "@/helpers/fonts"
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
			-based <Bg>React developer</Bg> who loves building <Under>unique</Under> and{` `}
			<Under>challenging</Under> user interfaces.
		</p>
	),
	furtherQuestions: [
		{
			question: `Tell me more about yourself.`,
			answer: (
				<p>
					I&apos;m an incredibly <Bold>ambitious</Bold> and{` `}
					<Bold>meticulous</Bold> developer who loves his work. My expertise lies in the very early stage of
					development, <Bg>from conception to MVP</Bg>; I&apos;ve helped several founders perform the initial build-out
					of their platforms at <span className="italic">breakneck speed</span>, without sacrificing app robustness and
					code quality. My technical skills are all <Bg>completely self-taught</Bg>, and nothing makes me happier than
					to build up my comfort zone, then step right out of it into something new. My own personal life is unending
					personal development and self-inquiry, and I&apos;m forever glad that the startup space allows me to feel the
					same in my professional life.
				</p>
			),
			furtherQuestions: [
				{
					question: `What tech do you usually work with?`,
					answer: <WhatTech />,
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
								in a set of HTML files. It was glorious for its time.
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
								<Bold>bundling</Bold>,{` `}
								<Bold>my first framework</Bold>, and even{` `}
								<Bold>user auth</Bold>
								{` `}
								and{` `}
								<Bold>how to use a database</Bold>. Take it from me, being overly ambitious is the number one way to get
								really good at something.
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
										For the past few years, I&apos;ve been divided on whether to delve further into back-end work, or
										specialize in front-end for good. That decision is clear as day to me now:{` `}
										<span className="font-semibold">
											<Under>front-end is where I belong</Under>
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
