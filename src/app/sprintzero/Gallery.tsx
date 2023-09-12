"use client"

import clsx from "clsx"
import {animate, motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform} from "framer-motion"
import {useEffect, useRef, useState} from "react"

type Chapter = {start: number; title: string; description: string}

const chapters: Chapter[] = [
	{
		start: 0,
		title: `Adding Story Map items`,
		description: `The Story Map is organized into Epics, Features, and Stories. Here, I'm adding several Epics, and then Features beneath the Epics, and finally Stories beneath those. Notice how the tree's layout is completely responsive.`,
	},
	{
		start: 48,
		title: `Editing Stories`,
		description: `User stories are the main unit of work in the app. Each story has a slew of associated data, accessible from a panel that slides up from the bottom. All the data here and throughout the rest of the app propagates to other team members in real time.`,
	},
	{
		start: 115,
		title: `Rearranging items`,
		description: `Every item in the Story Map is movable to anywhere else in the tree. Updates here are also propagated to other team members in real time, and the action of modifying the tree is completely fault-tolerant and consistent. Animation was planned here, and was partially implemented, but it proved too complex given our deadlines.`,
	},
	{
		start: 131,
		title: `Priorities page`,
		description: `The Story Map is actually modified in places all throughout the app, like here in the Priorities page. On this page, you arrange Stories in terms of user value and effort, and the Story Map is updated accordingly.`,
	},
	{
		start: 149,
		title: `Sprint Board page`,
		description: `The app had many pages, and to show them all would take too long. Here's a quick look at the Sprint Board page, where you can see all the Stories in a given Sprint, and drag them around to different columns. Not demonstrated is the ability to open the same Story information panel from earlier by clicking on a Story.`,
	},
]

export default function Gallery() {
	const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
	const videoProg = useMotionValue(0)
	const setVideoProg = (v: number) => {
		let chapterIndex = chapters.findIndex((c) => c.start > v) - 1
		if (chapterIndex < 0) chapterIndex = chapters.length - 1
		setCurrentChapterIndex(chapterIndex)
		animate(videoProg, v, {type: `tween`, duration: 0.1})
	}

	const videoRef = useRef<HTMLVideoElement>(null)
	const [videoDuration, setVideoDuration] = useState(120)
	useEffect(() => {
		if (!videoRef.current) return
		setVideoDuration(videoRef.current.duration)
	}, [])

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
				<source src="/demos/sprintzero-demo-av1.mp4" type="video/mp4; codecs=av01.0.30M.08" />
				<source src="/demos/sprintzero-demo-hevc.mp4" type="video/mp4; codecs=hvc1" />
				<source src="/demos/sprintzero-demo-vp9.webm" type="video/webm; codecs=vp9" />
			</video>

			<div className="relative mt-4 h-0.5 w-full bg-black/90">
				<motion.div
					className="h-full bg-text"
					style={{
						width: useMotionTemplate`${useTransform(videoProg, (p) => (p / videoDuration) * 100)}%`,
					}}
				/>
				{chapters.map((chapter, i) => (
					<button
						key={i}
						type="button"
						className={clsx(
							`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500`,
							`before:absolute before:-bottom-4 before:-left-4 before:-right-4 before:-top-4 before:block before:content-[""]`,
							currentChapterIndex === i ? `bg-text/80` : `bg-text saturate-0`,
						)}
						style={{left: `${(100 * chapter.start) / videoDuration}%`}}
						onClick={() => {
							if (!videoRef.current) return
							videoRef.current.currentTime = chapter.start
						}}
					>
						<div
							className="absolute inset-0 rounded-full mix-blend-luminosity"
							style={{
								backgroundImage: `linear-gradient(135deg, oklch(0.8 0 0) 30%, oklch(0.4 0 0) 80%)`,
								maskImage: `radial-gradient(transparent 45%, black 60%)`,
								WebkitMaskImage: `radial-gradient(transparent 45%, black 60%)`,
							}}
						/>
					</button>
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
