"use client"

import {animate, useMotionValue} from "framer-motion"
import {useEffect, useState} from "react"

import type {Transition} from "framer-motion"
import type {ReactElement} from "react"

import {useGlobalStore} from "@/helpers/useGlobalStore"

const transition = {
	type: `tween`,
	duration: 2,
	ease: `easeInOut`,
} satisfies Transition

export default function TransitionManager(): ReactElement | null {
	const transitionProg = useMotionValue(0)
	const [direction, setDirection] = useState(1)
	const setTransitionProg = useGlobalStore((store) => store.setTransitionProg)
	useEffect(() => setTransitionProg(transitionProg), [setTransitionProg, transitionProg])

	return (
		<button
			type="button"
			onClick={() => {
				if (direction === 0) {
					animate(transitionProg, 1, transition)
					setDirection(1)
				} else {
					animate(transitionProg, 0, transition)
					setDirection(0)
				}
			}}
			className="fixed left-12 top-12 hidden bg-black text-white"
		>
			Transition
		</button>
	)
}
