"use client"

import {LayoutGroup} from "framer-motion"

import type {ReactElement} from "react"

import QABlockRender from "./QABlockRender"
import {QaTree} from "./QaTree"

export default function SprintZeroAudience(): ReactElement | null {
	return (
		<div className="flex h-full flex-col items-stretch gap-2 overflow-auto p-6">
			<LayoutGroup>
				<QABlockRender qaBlock={QaTree} />
			</LayoutGroup>
		</div>
	)
}
