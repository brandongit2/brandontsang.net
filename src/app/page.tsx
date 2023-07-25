"use client"

import {OrthographicCamera} from "@react-three/drei"
import clsx from "clsx"
import {Anton} from "next/font/google"
import {WebGLRenderer} from "three"
import GithubIcon from "@public/github.svg"
import LinkedinIcon from "@public/linkedin.svg"

import type {ReactElement} from "react"

import StaticName from "./StaticName"
import {Canvas} from "@/components/clientWrapped/reactThreeFiber"

// eslint-disable-next-line @typescript-eslint/quotes
const anton = Anton({weight: "400", subsets: ["latin"]})

export default function Home(): ReactElement | null {
	return (
		<div className="h-full border-4 border-yellow-300 grid grid-cols-[2fr_1fr]">
			<div className="grid grid-rows-[1fr_auto]">
				<div className="relative">
					<div className="absolute inset-0">
						<Canvas
							flat
							linear
							gl={(canvas) => new WebGLRenderer({canvas, context: canvas.getContext(`webgl2`) ?? undefined})}
						>
							<OrthographicCamera
								makeDefault
								manual
								left={-0.5}
								right={0.5}
								top={0.5}
								bottom={-0.5}
								near={-50}
								far={50}
								position={[0, 0, -5]}
							/>
							<StaticName />
						</Canvas>
					</div>
					<div className="absolute inset-0 grid items-center text-transparent">
						<p className={clsx(anton.className, `text-[12rem] font-bold text-right leading-none`)}>BRANDON TSANG</p>
					</div>
				</div>
				<div className="m-16 flex gap-16">
					<p>1</p>
					<p>2</p>
					<p>3</p>
				</div>
			</div>

			<div className="px-6 py-12 flex flex-col gap-4 overflow-auto min-h-0">
				<p className="text-sm opacity-80">
					Hey! I am a Toronto-based full-stack JavaScript developer who loves building unique and challenging user
					interfaces.{" "}
					<span className="opacity-30">
						My work lies at a unique intersection between tech and art. I have several years of professional experience
						under my belt, and have spent even longer programming as a hobby. The reason I got into programming was the
						ability to create tools with pretty much unlimited freedom; I love how technology enables us to create such
						expansive experiences for our users. It's like graphic design superpowered by computers!
					</span>{" "}
					My expertise is mostly with React, TypeScript, and Node.js, but I am very comfortable with a multitude of
					other technologies (including on the backend!), and am constantly trying to expand my abilities.{" "}
					<span className="opacity-30">
						My origins were pretty inauspicous. I learned React in high school trying to create a graphing calculator,
						and I was immediately hooked on web dev. When university hit, I decided against studying computer science
						and so put programming aside for a while. During the pandemic, I decided to pick it back up again, and in
						2021 I dropped out of university and was hired as a software developer full-time.
					</span>
				</p>
				<p className="text-sm opacity-80">
					<span className="opacity-30">
						So what am I doing now? I've worked in several SaaS companies building very fulfilling products, and now I'm
						looking for a work experience which will really allow me to flex my creative muscles.
					</span>{" "}
					I'm perfectly happy with web development, but I would love the chance to work with 3D graphics, including XR
					and game development.{" "}
					<span className="opacity-30">That's my story, I guess. Also, I'm currently looking for a job!</span> If you'd
					like to reach out, I'd be happy to talk more about my abilities and how they can help at your company.
				</p>
				<div className="flex items-center gap-4 mt-4">
					<GithubIcon className="fill-white text-3xl" />
					<p>brandongit2</p>
				</div>
				<div className="flex items-center gap-4">
					<LinkedinIcon className="fill-white text-3xl" />
					<p>brandontsang2</p>
				</div>
			</div>
		</div>
	)
}
