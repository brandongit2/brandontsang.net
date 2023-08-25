import type {ReactElement} from "react"

import GithubIcon from "@public/github.svg"
import LinkedinIcon from "@public/linkedin.svg"

export default function AboutMe(): ReactElement | null {
	return (
		<div className="flex h-full flex-col items-start gap-4 overflow-auto p-6">
			<p>
				Hey! I am a Toronto-based frontend web developer who loves building unique and challenging user interfaces.{` `}
				<span className="opacity-30">
					My work lies at a unique intersection between tech and art. I have several years of professional experience
					under my belt, and have spent even longer programming as a hobby. I love web development for the ability to
					create tools with pretty much unlimited freedom; I love how web platforms enable us to create such expansive
					experiences for our users. It&apos;s like graphic design superpowered by computers!
				</span>
				{` `}
				My expertise is in React, TypeScript, and Node.js, and I am very comfortable with a multitude of other
				technologies (including on the backend!).{` `}
				<span className="opacity-30">
					Recently, I&apos;ve been diving into graphics programming with Three.js and React Three Fiber. The animated
					masthead on this site was created using GLSL shaders! In addition to graphics programming, I love math and
					science, which surprisingly shows in my work. Layout and geometry, deep computer science topics, data and
					statistics; all of these topics are more accessible to me because of it, and it&apos;s always fun being able
					to use these every now and then.
				</span>
				{` `}
				Something I&apos;m very proud of is my ability to learn new technologies quickly. All my development knowledge
				was completely self-taught, and I&apos;m always staying on top of the latest technologies and features.
				{` `}
				<span className="opacity-30">
					My journey began in high school when I was trying to create a graphing calculator. Needing reusable
					components, I found React and began learning it without really knowing what it was. But after a ton of
					frustration (especially with Webpack, which was a pain in the ass back then 😅), I was hooked on it. When
					university came, I decided against studying computer science and so put programming aside for a while. During
					the pandemic, I decided to pick it back up again, and in 2021 I dropped out of university and began working as
					a software developer full-time.
				</span>
			</p>
			<p>
				<span className="opacity-30">So what am I doing now?</span>
				{` `}I&apos;ve worked in several SaaS companies building some very fulfilling products, and now I&apos;m looking
				for a work experience which will really allow me to flex my creative muscles.
				{` `}
				<span className="opacity-30">
					I&apos;m perfectly happy with web development, but I would love the chance to build native iOS apps with
					SwiftUI. Working with 3D graphics, including XR and game development, is high on my list as well.
				</span>
				{` `}If you&apos;d like to reach out, I&apos;d be happy to talk more about my abilities and how they can help at
				your company.
			</p>

			<a
				href="https://github.com/brandongit2"
				target="_blank"
				rel="noreferrer"
				className="mt-4 flex items-center gap-4"
			>
				<GithubIcon className="fill-[--text-color] text-3xl" />
				<p className="underline">brandongit2</p>
			</a>
			<a
				href="https://www.linkedin.com/in/brandontsang2/"
				target="_blank"
				rel="noreferrer"
				className="flex items-center gap-4"
			>
				<LinkedinIcon className="fill-[--text-color] text-3xl" />
				<p className="underline">brandontsang2</p>
			</a>
		</div>
	)
}
