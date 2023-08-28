import type {ReactElement} from "react"

import VideoSlideTemplate from "./VideoSlideTemplate"

export default function IntroSlide(): ReactElement | null {
	return (
		<VideoSlideTemplate
			videoPath="/demos/sprintzero/adding-items.mp4"
			chapters={[
				{start: 0, title: `title title title title`, description: `description description description description`},
				{start: 5, title: `wait`, description: `what?`},
				{start: 10, title: `i gotta pee`, description: `i have to pee really badly`},
			]}
		/>
	)
}
