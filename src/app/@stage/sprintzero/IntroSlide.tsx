import type {ReactElement} from "react"

import VideoSlideTemplate from "./VideoSlideTemplate"

export default function IntroSlide(): ReactElement | null {
	return (
		<VideoSlideTemplate
			videoPath="/demos/sprintzero/adding-items.mp4"
			chapters={[
				{
					start: 0,
					title: `Adding Epics & Features`,
					description: `Epics and Features are how user stories are organized in the app. Here, I'm adding several epics, and features beneath the epics. Notice how the tree is completely responsive.`,
				},
				{
					start: 10.5,
					title: `Adding Stories`,
					description: `User stories are the main unit of work in the app. Each story has a slew of associated data`,
				},
			]}
		/>
	)
}
