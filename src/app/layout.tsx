import {Code} from "bright"
import clsx from "clsx"

import type {Metadata} from "next"
import type {ReactElement, ReactNode} from "react"

import "./styles.css"
import NavSection from "@/components/NavSection"
import {beardedTheme} from "@/helpers/beardedTheme"
import {figtree} from "@/helpers/fonts"

export const metadata: Metadata = {
	title: `BRANDON TSANG :: Senior Frontend Web Developer :: looking for work!`,
	description: `Hey! I am a Toronto-based senior frontend web developer who loves building unique and challenging user interfaces.`,
}

Code.theme = beardedTheme

type Props = {
	children?: ReactNode
}

export default async function RootLayout({children}: Props): Promise<ReactElement | null> {
	return (
		<html lang="en" className={clsx(figtree.className, `h-full`)}>
			<body className="grid h-full bg-text text-text">
				<div className="fixed left-0 top-0 -z-50 h-[100lvh] w-full bg-bg" />
				{/* Some yellow below the screen because iOS Safari renders down there below the search bar */}
				<div className="fixed -bottom-24 -z-50 h-24 w-full bg-text" />
				<div className="z-50">
					<div className="fixed left-0 top-0 h-1.5 w-full bg-text" />
					<div className="fixed left-0 top-0 h-[100lvh] w-1.5 bg-text" />
					<div className="fixed bottom-0 right-0 h-1.5 w-full bg-text" />
					<div className="fixed bottom-0 right-0 h-[100lvh] w-1.5 bg-text" />
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" className="fixed left-0 top-0 h-3 w-3">
						<path d="M0,0 L1,0 L1,0.5 A0.5,0.5 0 0 0 0.5,1 L0,1 Z" fill="currentColor" />
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" className="fixed right-0 top-0 h-3 w-3">
						<path d="M1,0 L0,0 L0,0.5 A0.5,0.5 0 0 1 0.5,1 L1,1 Z" fill="currentColor" />
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" className="fixed bottom-0 left-0 h-3 w-3">
						<path d="M0,1 L1,1 L1,0.5 A0.5,0.5 0 0 1 0.5,0 L0,0 Z" fill="currentColor" />
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" className="fixed bottom-0 right-0 h-3 w-3">
						<path d="M1,1 L0,1 L0,0.5 A0.5,0.5 0 0 0 0.5,0 L1,0 Z" fill="currentColor" />
					</svg>
				</div>

				<div className="p-1.5">
					<div className="relative">{children}</div>
				</div>

				<div className="pointer-events-none fixed bottom-0 left-0 w-full">
					<NavSection />
				</div>
			</body>
		</html>
	)
}
