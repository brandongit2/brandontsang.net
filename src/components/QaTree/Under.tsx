import type {ReactNode} from "react"

export type UnderProps = {
	children: ReactNode
}

export default function Under({children}: UnderProps) {
	return <span className="underline decoration-[oklch(97.1%_0.07_110.543/0.5)] underline-offset-2">{children}</span>
}
