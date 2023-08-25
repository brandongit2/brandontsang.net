import clsx from "clsx"
import localFont from "next/font/local"
import Link from "next/link"

import type {ReactElement} from "react"

// eslint-disable-next-line @typescript-eslint/quotes
const karrik = localFont({src: "../../public/Karrik-Regular.ttf"})

export type NavLinkProps = {
	href: string
	children: string
	subtext?: string
}

export default function NavLink({href, children, subtext}: NavLinkProps): ReactElement | null {
	return (
		<Link
			href={href}
			className={clsx(
				`relative flex flex-col items-center justify-center rounded-full px-10 py-4 text-center text-xl font-bold leading-none transition-all`,
				`[&:hover>div>div:last-child]:opacity-0 [&:hover>div]:scale-[102%]`,
				`[--inner-shadow-blur:20px] hover:[--inner-shadow-blur:20px]`,
				`[--inner-shadow-color:rgb(255_255_255/0.4)] hover:[--inner-shadow-color:rgb(0_0_0/0.1)]`,
				`[--box-shadow-opacity:0.6] hover:[--box-shadow-opacity:0.6]`,
				`[--box-shadow-spread:0px] hover:[--box-shadow-spread:2px]`,
				karrik.className,
			)}
			style={{
				color: `oklch(0.23 0.03 134.46)`,
				background: `linear-gradient(to bottom, rgb(250 255 105), rgb(168 172 55))`,
				boxShadow: `
					inset 0px 0px var(--inner-shadow-blur) var(--inner-shadow-color),
					rgb(43 51 0 / var(--box-shadow-opacity)) -8px 4px 30px var(--box-shadow-spread)
				`,
				textShadow: `oklch(0.99 0 0 / 0.6) -1px 1px 1px`,
			}}
		>
			{/* <div className="transition-all absolute top-0 left-0 w-full h-full">
				<div
					className="absolute w-full h-full rounded-full transition-all"
					style={{
						background: `linear-gradient(to bottom, rgb(250 255 105), rgb(168 172 55))`,
						boxShadow: `inset 0px 0px 10px rgb(0 0 0 / 0.1)`,
					}}
				/>

				<div
					className="absolute w-full h-full rounded-full transition-all"
					style={{
						background: `linear-gradient(to bottom, rgb(250 255 105), rgb(168 172 55))`,
						boxShadow: `inset 0px 0px 20px rgb(255 255 255 / 0.5)`,
					}}
				/>
			</div> */}
			<span className="scale-x-110">{children}</span>
			{subtext && <span className="scale-x-110 text-xs opacity-70">{subtext}</span>}
		</Link>
	)
}
