"use client"

import {type ReactElement} from "react"

import IntroSlide from "./IntroSlide"

export default function SprintZero(): ReactElement | null {
	return (
		<div className="h-full max-h-[90%] min-h-0 max-w-4xl">
			<IntroSlide />
		</div>
	)
}
