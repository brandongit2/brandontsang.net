import type {ReactNode} from "react"

export type CdeProps = {
	children: ReactNode
}

export default function Cde({children}: CdeProps) {
	return <code className="-mx-0.5 bg-black/20 px-0.5 text-[0.9em]">{children}</code>
}
