import {motion} from "framer-motion"
import {type ReactElement} from "react"

import MotionLink from "@/components/motion/MotionLink"

export type NavLinkProps = {
	href: string
	children: string
	subtext?: string
	zIndex?: number | `unset`
}

export default function NavLink({href, children, subtext, zIndex = `unset`}: NavLinkProps): ReactElement | null {
	return (
		<MotionLink
			href={href}
			className="font-karrik relative flex flex-col items-center justify-center rounded-full px-8 py-2 text-center leading-none tablet:px-10 tablet:py-4 tablet:text-xl"
			initial="normal"
			whileHover="hover"
			whileTap="tap"
			variants={{
				normal: {},
				hover: {},
				tap: {},
			}}
			style={{
				color: `oklch(0.23 0.03 134.46)`,
				textShadow: `oklch(0.99 0.1 114 / 0.6) -1px 1px 1px`,
				zIndex,
			}}
		>
			<motion.div
				className="absolute h-full w-full rounded-full"
				transition={{type: `spring`, damping: 10, mass: 0.8, stiffness: 500}}
				variants={{
					normal: {
						backgroundImage: `linear-gradient(oklch(0.87 0.14 110.13), oklch(0.63 0.12 111.29))`,
						boxShadow: `inset -5px -2px 10px -3px oklch(0.2 0 0 / 0.3), rgb(43 51 0 / 0.6) -8px 4px 20px`,
					},
					hover: {
						backgroundImage: `linear-gradient(oklch(0.85 0.14 118), oklch(0.59 0.16 118))`,
						scaleX: 1.02,
						scaleY: 1.05,
						boxShadow: `inset -5px -2px 17px -3px oklch(0.2 0 0 / 0.1), rgb(43 51 0 / 0.6) -10px 6px 30px`,
					},
					tap: {
						backgroundImage: `linear-gradient(oklch(0.76 0.14 118), oklch(0.55 0.16 118))`,
						scaleX: 0.99,
						scaleY: 0.98,
						boxShadow: `inset -5px -2px 6px -3px oklch(0.4 0 0 / 0.4), rgb(43 51 0 / 0.6) -10px 6px 30px`,
						transition: {type: `spring`, damping: 15, mass: 0.8, stiffness: 1000},
					},
				}}
			/>
			<span className="scale-x-110">{children}</span>
			{subtext && <span className="scale-x-110 text-xs opacity-70">{subtext}</span>}
		</MotionLink>
	)
}
