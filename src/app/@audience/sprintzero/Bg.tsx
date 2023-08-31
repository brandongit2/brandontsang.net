import type {ReactNode} from "react"

export type BgProps = {
	children: ReactNode
}

export default function Bg({children}: BgProps) {
	return (
		<span className="-mx-1 -my-px bg-gradient-to-r from-[oklch(0.2_0.5_115/0.8)] to-[oklch(0.2_0.5_115/0.8)] bg-no-repeat px-1 py-px font-medium text-[oklch(0.97_0.16_109.47)]">
			{children}
		</span>
	)
}
