"use client"

import clsx from "clsx"
import {motion} from "framer-motion"
import {useState} from "react"

export default function HemlaneMarketingGallery() {
	const [video, setVideo] = useState<"desktop" | "mobile">(`desktop`)

	return (
		<div className="max-w-full">
			<div className="relative mx-auto aspect-[4/3] max-h-[50svh] min-h-0 min-w-0 max-w-4xl">
				{/* For sizing */}
				<div className="relative -z-50 h-screen w-screen max-w-[calc(100%-3rem)]" />

				<div className="absolute inset-0 grid place-items-center [container-type:size]">
					<motion.div
						className="relative h-full w-auto overflow-clip border border-bg/80 bg-white"
						style={{borderRadius: `16px`}}
						animate={video}
						variants={{
							desktop: {aspectRatio: 4 / 3},
							mobile: {aspectRatio: 1 / 2},
						}}
						transition={{type: `spring`, duration: 0.6, velocity: -2000, bounce: 0.4}}
					>
						<div className="absolute -inset-96">
							<motion.video
								key="mobile"
								autoPlay
								loop
								muted
								controls={false}
								playsInline
								poster="/demos/hemlane-marketing/mobile-poster.jpg"
								className="absolute left-1/2 top-1/2 aspect-[1/2] h-[100cqh] w-auto -translate-x-1/2 -translate-y-1/2"
							>
								<source src="/demos/hemlane-marketing/mobile-av1.mp4" type="video/mp4; codecs=av01.0.09M.08" />
								<source src="/demos/hemlane-marketing/mobile-hevc.mp4" type="video/mp4; codecs=hvc1.1.6.L123" />
								<source src="/demos/hemlane-marketing/mobile-vp9.webm" type="video/webm; codecs=vp9" />
							</motion.video>

							<motion.video
								key="desktop"
								autoPlay
								loop
								muted
								controls={false}
								playsInline
								poster="/demos/hemlane-marketing/desktop-poster.jpg"
								className="absolute left-1/2 top-1/2 aspect-[4/3] h-[100cqh] w-auto -translate-x-1/2 -translate-y-1/2 scale-[1.001]"
								variants={{
									desktop: {opacity: 1},
									mobile: {opacity: 0, transition: {delay: 0.1}},
								}}
								transition={{duration: 0.2}}
							>
								<source src="/demos/hemlane-marketing/desktop-av1.mp4" type="video/mp4; codecs=av01.0.09M.08" />
								<source src="/demos/hemlane-marketing/desktop-hevc.mp4" type="video/mp4; codecs=hvc1.1.6.L123" />
								<source src="/demos/hemlane-marketing/desktop-vp9.webm" type="video/webm; codecs=vp9" />
							</motion.video>
						</div>
					</motion.div>
				</div>
			</div>

			<div
				className="float-right mr-2 mt-4 flex w-max items-center rounded-md border border-white/30 text-white"
				style={{
					backgroundImage: `linear-gradient(to bottom, oklch(1 0 0 / 0.1), oklch(1 0 0 / 0.2) 10%, oklch(1 0 0 / 0.3) 35%, oklch(1 0 0 / 0.2) 70%, oklch(1 0 0 / 0.05))`,
					boxShadow: `inset -3px 1px 6px 0px oklch(0 0 0 / 0.3), inset 4px 2px 3px 0px oklch(1 0 0 / 0.1)`,
				}}
			>
				<button
					type="button"
					className={clsx(
						`w-20 shrink-0 basis-20 rounded-l-md p-1 text-center text-sm transition-colors`,
						video === `desktop` ? `bg-neutral-900/50 font-normal shadow-[0px_0px_40px_oklch(1_0_0/0.2)]` : `font-light`,
					)}
					style={{textShadow: `-1px 1px 1px oklch(0 0 0 / 0.3)`}}
					onClick={() => setVideo(`desktop`)}
				>
					Desktop
				</button>
				<div className="h-4 shrink-0 basis-px bg-white/50" />
				<button
					type="button"
					className={clsx(
						`w-20 shrink-0 basis-20 rounded-r-md p-1 text-center text-sm transition-colors`,
						video === `mobile` ? `bg-black/30 font-normal shadow-[0px_0px_40px_oklch(1_0_0/0.2)]` : `font-light`,
					)}
					style={{textShadow: `-1px 1px 1px oklch(0 0 0 / 0.6)`}}
					onClick={() => setVideo(`mobile`)}
				>
					Mobile
				</button>
			</div>
		</div>
	)
}
