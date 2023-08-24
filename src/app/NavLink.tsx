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
				`px-10 py-4 scale-x-110 leading-none rounded-full flex flex-col items-center justify-center bg-gradient-to-b from-white/90 to-neutral-200/75 text-center font-bold text-xl`,
				karrik.className,
			)}
			style={{
				color: `oklch(0.23 0.03 134.46)`,
				background: `linear-gradient(to bottom, rgb(250 255 105), rgb(168 172 55))`,
				boxShadow: `
					inset 0px 0px 20px rgb(255 255 255 / 0.6),
					gb(43 51 0 / 70%) -8px 4px 30px
				`,
				textShadow: `oklch(0.99 0 0 / 0.6) -1px 1px 1px`,
			}}
		>
			<span>{children}</span>
			{subtext && <span className="text-xs opacity-70">{subtext}</span>}
		</Link>
	)
}
