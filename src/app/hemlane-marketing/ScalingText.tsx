"use client"

export type ScalingTextProps = {
	text: string
	initialAspectRatio: number
}

export default function ScalingText({text, initialAspectRatio}: ScalingTextProps) {
	return (
		<p className="h-auto w-full" style={{aspectRatio: initialAspectRatio}}>
			{text}
		</p>
	)
}
