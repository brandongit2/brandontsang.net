import clsx from "clsx"
import {Figtree} from "next/font/google"

import type {ReactElement, ReactNode} from "react"

import "./styles.css"

// eslint-disable-next-line @typescript-eslint/quotes
const figtree = Figtree({subsets: ["latin"]})

type Props = {
	children?: ReactNode
}

export default function RootLayout({children}: Props): ReactElement | null {
	return (
		<html lang="en" className={clsx(figtree.className, `h-full`)}>
			<body className="grid h-full overflow-hidden bg-[--text-color] text-[--text-color]">{children}</body>
		</html>
	)
}
