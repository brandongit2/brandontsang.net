import clsx from "clsx"
import localFont from "next/font/local"

import type {ReactElement, ReactNode} from "react"

import "./styles.css"

/* eslint-disable @typescript-eslint/quotes */
const figtree = localFont({
	src: [
		{
			path: "../../public/fonts/Figtree-Variable.woff2",
			style: "normal",
		},
		{
			path: "../../public/fonts/Figtree-Italic-Variable.woff2",
			style: "italic",
		},
	],
})
/* eslint-enable @typescript-eslint/quotes */

type Props = {
	children?: ReactNode
}

export default async function RootLayout({children}: Props): Promise<ReactElement | null> {
	return (
		<html lang="en" className={clsx(figtree.className, `h-full`)}>
			<body className="grid h-full bg-text text-text">
				<div className="fixed inset-0 -z-50 bg-bg" />
				<div className="fixed z-50">
					<div className="fixed left-0 top-0 h-1.5 w-full bg-text" />
					<div className="fixed left-0 top-0 h-full w-1.5 bg-text" />
					<div className="fixed bottom-0 right-0 h-1.5 w-full bg-text" />
					<div className="fixed bottom-0 right-0 h-full w-1.5 bg-text" />
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
			</body>
		</html>
	)
}
