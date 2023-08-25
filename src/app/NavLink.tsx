"use client"

import clsx from "clsx"
import localFont from "next/font/local"
import Link from "next/link"
import {usePathname} from "next/navigation"

import type {ReactElement} from "react"

// eslint-disable-next-line @typescript-eslint/quotes
const karrik = localFont({src: "../../public/Karrik-Regular.ttf"})

export type NavLinkProps = {
	href: string
	children: string
	subtext?: string
}

export default function NavLink({href, children, subtext}: NavLinkProps): ReactElement | null {
	const pathname = usePathname()
	console.log(pathname)

	return (
		<Link
			href={href}
			className={clsx(
				`relative flex flex-col items-center justify-center rounded-full px-10 py-4 text-center text-xl font-bold leading-none transition-all`,
				`[&:hover>div:last-of-type]:opacity-0 [&:hover>div]:scale-x-[102%] [&:hover>div]:scale-y-[105%]`,
				`[&:active>div]:scale-x-[98%] [&:active>div]:scale-y-[98%]`,
				`[--box-shadow-opacity:0.6] hover:[--box-shadow-opacity:0.7]`,
				`[--box-shadow-blur:30px] hover:[--box-shadow-blur:40px]`,
				`[--inner-shadow-blur:10px] active:[--inner-shadow-blur:4px]`,
				`[--inner-shadow-color:oklch(0.8_0_0/0.5)] active:[--inner-shadow-color:oklch(0.5_0_0/0.3)]`,
				karrik.className,
			)}
			style={{
				color: `oklch(0.23 0.03 134.46)`,
				background: `linear-gradient(to bottom, rgb(250 255 105), rgb(168 172 55))`,
				boxShadow: `rgb(43 51 0 / var(--box-shadow-opacity)) -8px 4px var(--box-shadow-blur)`,
				textShadow: `oklch(0.99 0 0 / 0.6) -1px 1px 1px`,
			}}
		>
			<div
				className="absolute h-full w-full rounded-full transition-all"
				style={{
					background: `linear-gradient(oklch(0.85 0.14 118), oklch(0.59 0.16 118))`,
					boxShadow: `inset 0px 0px var(--inner-shadow-blur) var(--inner-shadow-color)`,
				}}
			/>
			<div
				className="absolute h-full w-full rounded-full transition-all"
				style={{
					background: `linear-gradient(oklch(0.92 0.11 110.13), oklch(0.63 0.12 111.29))`,
					boxShadow: `inset 0px 0px var(--inner-shadow-blur) var(--inner-shadow-color)`,
				}}
			/>
			<span className="scale-x-110">{children}</span>
			{subtext && <span className="scale-x-110 text-xs opacity-70">{subtext}</span>}
		</Link>
	)
}
