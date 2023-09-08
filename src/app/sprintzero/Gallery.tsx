"use client"

import {useAnimationFrame} from "framer-motion"
import {useRef, useState} from "react"

type Chapter = {start: number; title: string; description: string}

const chapters: Chapter[] = [
	{
		start: 0,
		title: `Adding Epics & Features`,
		description: `Epics and Features are how user stories are organized in the app. Here, I'm adding several epics, and features beneath the epics. Notice how the tree is completely responsive.`,
	},
	{
		start: 10.5,
		title: `Adding Stories`,
		description: `User stories are the main unit of work in the app. Each story has a slew of associated data, accessible from a panel that slides up from the bottom.`,
	},
]

export default function Gallery() {
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
		<div className="mx-auto max-w-3xl px-3">
			<video
				autoPlay
				loop
				muted
				controls={false}
				playsInline
				className="h-auto min-h-0 w-full rounded-2xl border border-text/20"
				ref={videoRef}
				onClick={(e) => {
					if (e.currentTarget.paused) e.currentTarget.play()
					else e.currentTarget.pause()
				}}
			>
				<source src="/demos/sprintzero/adding-items.mp4" type="video/mp4" />
			</video>
			<div className="relative mt-2">
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
				className="mt-4 rounded-2xl border border-text/20 px-6 py-4 text-lg"
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
				<p className="text-sm opacity-90">{chapters[currentChapterIndex].description}</p>
			</div>
		</div>
	)
}
