import {Figtree} from "@next/font/google"
import clsx from "clsx"

import type {ReactElement, ReactNode} from "react"

import "./styles.css"

const figtree = Figtree()

type Props = {
	children?: ReactNode
}

const RootLayout = ({children}: Props): ReactElement | null => {
	return (
		<html lang="en" className={clsx(figtree.className, `h-full`)}>
			<body className="h-full">{children}</body>
		</html>
	)
}

export default RootLayout
