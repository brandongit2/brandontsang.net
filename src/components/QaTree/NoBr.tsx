import type {ReactNode} from "react"

export type NoBrProps = {
	children: ReactNode
}

export default function NoBr({children}: NoBrProps) {
	return <span className="whitespace-nowrap">{children}</span>
}
