import clsx from "clsx"

import {computerModern, courier, ft88} from "@/helpers/fonts"

export default function AboutMe() {
	return (
		<p>
			Some people express themselves through physical art, some through music, some through words&hellip; Well, I do it
			through <span className={clsx(ft88.className)}>pixels on a screen</span>, with{` `}
			<span className={clsx(courier.className, `bg-black px-0.5 pt-1 text-green-400`)}>code</span> and{` `}
			<span className={clsx(computerModern.className, `bg-white/90 px-0.5 text-black`)}>mathematics</span>
			{` `}
			as my tools. I&apos;m drawn by the literally infinite number of things you can make with practically no resources
			but time and practice.
		</p>
	)
}
