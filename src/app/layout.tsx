import clsx from "clsx"
import {Figtree} from "next/font/google"

import type {ReactElement, ReactNode} from "react"

import NavLink from "./NavLink"
import "./styles.css"

// eslint-disable-next-line @typescript-eslint/quotes
const figtree = Figtree({subsets: ["latin"]})

type Props = {
	// eslint-disable-next-line react/no-unused-prop-types -- Everything is rendered in the parallel routes instead
	children?: ReactNode
	stage?: ReactNode
	audience?: ReactNode
}

export default function RootLayout({stage, audience}: Props): ReactElement | null {
	return (
		<html lang="en" className={clsx(figtree.className, `h-full`)}>
			<body className="bg-text text-text grid h-full overflow-hidden">
				<div className="m-1.5 grid h-[calc(100%-0.75rem)] grid-cols-[2fr_1fr] overflow-hidden rounded-md bg-[--bg-color]">
					<div className="grid grid-rows-[1fr_auto]">
						<div className="relative isolate w-full">{stage}</div>
						<div className="relative isolate mb-16 mt-8 grid grid-cols-[1fr_max-content_2fr_max-content_2fr_max-content_1fr]">
							<div className="border-text absolute top-1/2 h-px w-[calc(100%-1rem)] -translate-y-1/2 border-2 border-dashed opacity-40" />
							<div className="bg-text absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded opacity-40" />

							<div />
							<NavLink href="/">main page</NavLink>
							<div />
							<NavLink href="/" subtext="PROJECT">
								sprintzero
							</NavLink>
							<div />
							<NavLink href="/" subtext="PROJECT">
								hemlane marketing site
							</NavLink>
							<div />
						</div>
					</div>

					<div className="isolate min-h-0">{audience}</div>
				</div>
			</body>
		</html>
	)
}
