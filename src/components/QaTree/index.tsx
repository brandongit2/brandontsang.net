"use client"

import {MotionConfig} from "framer-motion"
import {type ReactElement} from "react"

import type {QaNode as QaNodeType} from "./types"

import QaNode from "./QaNode"
import {springVarHelper} from "@/helpers/springVarHelper"

export type QaTreeProps = {
	qaTree: QaNodeType
}

export default function QaTree({qaTree}: QaTreeProps): ReactElement | null {
	return (
		<div className="flex flex-col gap-2">
			<MotionConfig transition={{layout: {type: `spring`, velocity: -180, ...springVarHelper(150, 0.6)}}}>
				<QaNode root node={qaTree} />
			</MotionConfig>
		</div>
	)
}
