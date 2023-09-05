"use client"

import {LayoutGroup} from "framer-motion"

import type {ReactElement} from "react"

import {sprintZeroQaTree} from "./sprintZeroQaTree"
import QaTree from "@/components/QaTree"

export default function SprintZeroAudience(): ReactElement | null {
	return (
		<div className="max-w-xl font-extralight leading-snug tracking-wide text-[oklch(97.1%_0.07_110.543)]">
			<LayoutGroup>
				<QaTree qaTree={sprintZeroQaTree} />
			</LayoutGroup>
		</div>
	)
}
