"use client"

export default function HemlaneMarketingGallery() {
	return (
		<video
			autoPlay
			loop
			muted
			controls={false}
			playsInline
			className="h-auto min-h-0 w-full rounded-2xl border border-text/20"
			onClick={(e) => {
				if (e.currentTarget.paused) e.currentTarget.play()
				else e.currentTarget.pause()
			}}
		>
			<source src="/demos/hemlane-marketing/desktop.mp4" type="video/mp4" />
		</video>
	)
}
