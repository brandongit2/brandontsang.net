import {motion} from "framer-motion"
import Link from "next/link"
import {forwardRef} from "react"

import type {ComponentProps, ReactElement} from "react"

const MotionLink = motion(
	forwardRef<HTMLAnchorElement, ComponentProps<typeof Link>>(
		function MotionLinkWithRef(props, ref): ReactElement | null {
			return <Link {...props} ref={ref} />
		},
	),
)

export default MotionLink
