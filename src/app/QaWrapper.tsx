"use client"

import {LayoutGroup, MotionConfig, motion} from "framer-motion"

import {mainPageQaTree} from "./mainPageQaTree"
import QaTree from "@/components/QaTree"
import {springVarHelper} from "@/helpers/springVarHelper"
import GithubIcon from "@public/logos/github.svg"
import LinkedinIcon from "@public/logos/linkedin.svg"

export default function QaWrapper() {
	return (
		<LayoutGroup>
			<MotionConfig transition={{layout: {type: `spring`, velocity: -180, ...springVarHelper(150, 0.6)}}}>
				<div className="text-justify font-light leading-snug tracking-wide [&_p:not(.indent-0)]:indent-4">
					<QaTree qaTree={mainPageQaTree} />
				</div>

				<motion.a
					layout="position"
					href="https://github.com/brandongit2"
					target="_blank"
					rel="noreferrer"
					className="mt-12 flex w-max items-center gap-4"
				>
					<GithubIcon className="h-8 w-auto fill-current" />
					<p className="underline">brandongit2</p>
				</motion.a>
				<motion.a
					layout="position"
					href="https://www.linkedin.com/in/brandontsang2/"
					target="_blank"
					rel="noreferrer"
					className="mt-4 flex w-max items-center gap-4"
				>
					<LinkedinIcon className="h-8 w-auto fill-current" />
					<p className="underline">brandontsang2</p>
				</motion.a>
			</MotionConfig>
		</LayoutGroup>
	)
}
