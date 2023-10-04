import Image from "next/image"

import FramerMotionLogo from "@/components/logo-svgs/FramerMotionLogo"
import NextJsLogo from "@/components/logo-svgs/NextJsLogo"
import ReactLogo from "@/components/logo-svgs/ReactLogo"
import Bg from "@/components/QaTree/Bg"
import NoBr from "@/components/QaTree/NoBr"
import Under from "@/components/QaTree/Under"
import TailwindCssLogo from "@public/logos/tailwindcss.svg"
import typescriptLogo from "@public/logos/typescript.png"

export default function WhatTech() {
	return (
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
				My knowledge isn&apos;t limited to just the front-end either; I have loads of experience building out
				{` `}
				<Bg>back-ends</Bg>, working with <Bg>databases</Bg>, and even a little experience deploying on{` `}
				<Bg>cloud platforms</Bg> and with{` `}
				<Bg>Docker</Bg>.
			</p>
			<p>
				While I may use all the latest, shiniest technologies, I didn&apos;t start out this way at all. My fundamentals
				are rock-solid, having started with just hobby HTML/CSS sites, evolving through JavaScript, bundling,
				TypeScript, all the way through to the modern frameworks of today.{` `}
				<Under>
					I never pick up new things because I hear they&apos;re cool; I only learn new things to solve the problems
					I&apos;m already facing.
				</Under>
			</p>
		</>
	)
}
