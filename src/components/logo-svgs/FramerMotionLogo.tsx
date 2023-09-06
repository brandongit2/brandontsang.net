import type {CSSProperties} from "react"

export type FramerMotionLogoProps = {
	style?: CSSProperties
	className?: string
}

export default function FramerMotionLogo({style, className}: FramerMotionLogoProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="-3.5 0 17.5 21"
			role="presentation"
			style={style}
			className={className}
		>
			<path d="M0 0h14v7H7zm0 7h7l7 7H7v7l-7-7z" fill="currentColor" />
		</svg>
	)
}
