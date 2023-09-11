"use client"

import clsx from "clsx"
import {motion} from "framer-motion"
import {useState} from "react"

export default function HemlaneMarketingGallery() {
	const [video, setVideo] = useState<"desktop" | "mobile">(`desktop`)

	return (
		<div>
			<div
				className={clsx(
					`relative h-[50svh] w-auto overflow-hidden rounded-2xl border border-text/20 transition-all duration-1000`,
					video === `desktop` ? `aspect-[4/3]` : `aspect-[0.4826]`,
				)}
			>
				{video === `mobile` && (
					<video
						autoPlay
						loop
						muted
						controls={false}
						playsInline
						className="absolute left-0 top-0 h-full min-h-0 w-max min-w-0"
						onClick={(e) => {
							if (e.currentTarget.paused) e.currentTarget.play()
							else e.currentTarget.pause()
						}}
					>
						<source src="/demos/hemlane-marketing/mobile.mp4" type="video/mp4" />
					</video>
				)}
				{video === `desktop` && (
					<motion.video
						exit={{opacity: 0}}
						autoPlay
						loop
						muted
						controls={false}
						playsInline
						className="absolute left-0 top-0 h-full min-h-0 w-max min-w-0"
						onClick={(e) => {
							if (e.currentTarget.paused) e.currentTarget.play()
							else e.currentTarget.pause()
						}}
					>
						<source src="/demos/hemlane-marketing/desktop.mov" type="video/mp4" />
					</motion.video>
				)}
			</div>

			<button
				type="button"
				className="rounded-md border border-text/30 bg-black/80 px-3 py-0.5 text-sm"
				onClick={() => setVideo(`desktop`)}
			>
				Desktop
			</button>
			<button
				type="button"
				className="rounded-md border border-text/30 bg-black/80 px-3 py-0.5 text-sm"
				onClick={() => setVideo(`mobile`)}
			>
				Mobile
			</button>
		</div>
	)
}
