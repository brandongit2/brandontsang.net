import {useAnimationFrame} from "framer-motion"
import {useState, type ReactElement, useRef} from "react"

export type VideoSlideTemplateProps = {
	videoPath: string
	chapters: Array<{start: number; title: string; description: string}>
}

export default function VideoSlideTemplate({videoPath, chapters}: VideoSlideTemplateProps): ReactElement | null {
	const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
	const [videoProg, _setVideoProg] = useState(0)
	const setVideoProg = (v: number) => {
		let chapterIndex = chapters.findIndex((c) => c.start > v) - 1
		if (chapterIndex < 0) chapterIndex = chapters.length - 1
		setCurrentChapterIndex(chapterIndex)
		_setVideoProg(v)
	}

	const videoRef = useRef<HTMLVideoElement>(null)
	useAnimationFrame(() => {
		if (!videoRef.current) return
		setVideoProg(videoRef.current.currentTime)
	})

	return (
		<div className="flex h-full flex-col items-center">
			<video
				autoPlay
				loop
				muted
				className="h-full min-h-0 min-w-0 shrink grow basis-0 rounded-2xl border border-text/20"
				ref={videoRef}
				onClick={(e) => {
					if (e.currentTarget.paused) e.currentTarget.play()
					else e.currentTarget.pause()
				}}
			>
				<source src={videoPath} type="video/mp4" />
			</video>
			<div className="relative mt-2 w-full">
				<input
					type="range"
					min="0"
					max={videoRef.current?.duration ?? 10}
					step="any"
					className="w-full"
					value={videoProg}
					onChange={(e) => {
						if (!videoRef.current) return
						videoRef.current.currentTime = parseFloat(e.currentTarget.value)
						setVideoProg(videoRef.current.currentTime)
					}}
					onPointerDown={() => {
						if (!videoRef.current) return
						videoRef.current.pause()
					}}
					onPointerUp={() => {
						if (!videoRef.current) return
						videoRef.current.play()
					}}
				/>
				{chapters.map((chapter, i) => (
					<div
						key={i}
						className="absolute top-0 h-4 w-4 rounded-full bg-white"
						style={{left: `${(100 * chapter.start) / (videoRef.current?.duration ?? 10)}%`}}
					/>
				))}
			</div>

			<div
				className="mt-12 rounded-2xl border border-text/20 px-6 py-4 text-lg"
				style={{
					backgroundImage: `linear-gradient(to bottom, oklch(25% 0.058 144.97 / 97%), oklch(29.9% 0.056 144.97 / 97%) 80%, oklch(32% 0.052 144.97 / 97%))`,
					boxShadow: `
						inset 0px 2px 15px -2px oklch(12.6% 0.016 122 / 50%),
						-2px 4px 20px -4px oklch(23.4% 0.063 144.97)
					`,
					textShadow: `-1px 1px 6px oklch(0 0 0 / 1)`,
				}}
			>
				<p className="font-bold">{chapters[currentChapterIndex].title}</p>
				<p>{chapters[currentChapterIndex].description}</p>
			</div>
		</div>
	)
}
