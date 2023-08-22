import type {ReactElement} from "react"

import {loadMsdfFont, loadSdfFont} from "./loadFont"
import NameCanvas from "./NameCanvas"
import GithubIcon from "@public/github.svg"
import LinkedinIcon from "@public/linkedin.svg"

export default async function Home(): Promise<ReactElement | null> {
	const msdfFont = await loadMsdfFont()
	const sdfFont = await loadSdfFont()

	return (
		<div className="h-[calc(100%-0.75rem)] m-1.5 rounded-md bg-[--bg-color] grid grid-cols-[2fr_1fr]">
			<div className="grid grid-rows-[1fr_auto]">
				<div className="relative max-w-[80rem] justify-self-end w-full">
					<div className="absolute inset-0">
						<NameCanvas msdfFont={msdfFont} sdfFont={sdfFont} />
					</div>
				</div>
				<div className="m-16 flex gap-16 justify-end">
					<button
						type="button"
						style={{background: `radial-gradient(circle, rgba(74,4,78,1) 30%, rgba(253,224,71,1) 60%)`}}
						className="w-12 h-12 text-lg font-bold grid place-items-center rounded-full"
					>
						1
					</button>
					<button
						type="button"
						style={{background: `radial-gradient(circle, rgba(74,4,78,1) 30%, rgba(253,224,71,1) 60%)`}}
						className="w-12 h-12 text-lg font-bold grid place-items-center rounded-full"
					>
						2
					</button>
					<button
						type="button"
						style={{background: `radial-gradient(circle, rgba(74,4,78,1) 30%, rgba(253,224,71,1) 60%)`}}
						className="w-12 h-12 text-lg font-bold grid place-items-center rounded-full"
					>
						3
					</button>
				</div>
			</div>

			<div className="p-6 flex flex-col gap-4 overflow-auto min-h-0">
				<p>
					Hey! I am a Toronto-based full-stack JavaScript developer who loves building unique and challenging user
					interfaces.{` `}
					<span className="opacity-30">
						My work lies at a unique intersection between tech and art. I have several years of professional experience
						under my belt, and have spent even longer programming as a hobby. The reason I got into programming was the
						ability to create tools with pretty much unlimited freedom; I love how technology enables us to create such
						expansive experiences for our users. It&apos;s like graphic design superpowered by computers!
					</span>
					{` `}
					My expertise is mostly with React, TypeScript, and Node.js, but I am very comfortable with a multitude of
					other technologies (including on the backend!), and am constantly trying to expand my abilities.{` `}
					<span className="opacity-30">
						My origins were pretty inauspicous. I learned React in high school trying to create a graphing calculator,
						and I was immediately hooked on web dev. When university hit, I decided against studying computer science
						and so put programming aside for a while. During the pandemic, I decided to pick it back up again, and in
						2021 I dropped out of university and was hired as a software developer full-time.
					</span>
				</p>
				<p>
					<span className="opacity-30">
						So what am I doing now? I&apos;ve worked in several SaaS companies building very fulfilling products, and
						now I&apos;m looking for a work experience which will really allow me to flex my creative muscles.
					</span>
					{` `}
					I&apos;m perfectly happy with web development, but I would love the chance to work with 3D graphics, including
					XR and game development.{` `}
					<span className="opacity-30">That&apos;s my story, I guess. Also, I&apos;m currently looking for a job!</span>
					{` `}
					If you&apos;d like to reach out, I&apos;d be happy to talk more about my abilities and how they can help at
					your company.
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
