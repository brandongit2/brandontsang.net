import type {ReactElement} from "react"

import {loadMsdfFontAtlas, loadSdfFontAtlas} from "./(name-canvas)/loadFontAtlas"
import NameCanvas from "./(name-canvas)/NameCanvas"
import NavLink from "./NavLink"
import GithubIcon from "@public/github.svg"
import LinkedinIcon from "@public/linkedin.svg"

export default async function Home(): Promise<ReactElement | null> {
	const msdfFontAtlas = await loadMsdfFontAtlas()
	const sdfFontAtlas = await loadSdfFontAtlas()

	return (
		<div className="h-[calc(100%-0.75rem)] m-1.5 rounded-md overflow-hidden bg-[--bg-color] grid grid-cols-[2fr_1fr]">
			<div className="grid grid-rows-[1fr_auto]">
				<div className="relative w-full isolate">
					<div className="absolute -inset-32">
						<NameCanvas msdfFontAtlas={msdfFontAtlas} sdfFontAtlas={sdfFontAtlas} />
					</div>
				</div>
				<div className="grid py-16 relative grid-cols-[1fr_max-content_2fr_max-content_2fr_max-content_1fr] isolate">
					<div className="absolute w-full border-dashed -translate-y-1/2 border-2 h-px opacity-40 border-[--text-color] top-1/2" />
					<div className="absolute top-1/2 -translate-y-1/2 left-full w-4 h-4 rounded bg-[--text-color] opacity-40" />

					<div />
					<NavLink href="/">main page</NavLink>
					<div />
					<NavLink href="/" subtext="PROJECT">
						sprintzero
					</NavLink>
					<div />
					<NavLink href="/" subtext="PROJECT">
						hemlane marketing site
					</NavLink>
					<div />
				</div>
			</div>

			<div className="p-6 flex flex-col gap-4 overflow-auto min-h-0 isolate">
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
