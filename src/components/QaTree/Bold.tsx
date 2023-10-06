import type {ReactNode} from "react"

export type BoldProps = {
	children: ReactNode
}

export default function Bold({children}: BoldProps) {
	return (
		<span className="font-semibold text-[color-mix(in_srgb,oklch(90%_0.157_110.543),oklch(0.45_1_120)_40%)]">
			{children}
		</span>
	)
}
