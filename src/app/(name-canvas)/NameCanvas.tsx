"use client"

import {Canvas} from "@react-three/fiber"
import Image from "next/image"
import {useMemo, type ReactElement} from "react"

import type {FontAtlas} from "@/types/FontAtlas"

import {name} from "./name"
import NamePostprocess from "./NamePostprocess"
import bmFontLayout from "@/helpers/bmFontLayout"
import nameFallback from "@public/name-fallback.avif"

export type NameCanvasProps = {
	sdfFontAtlas: FontAtlas
	msdfFontAtlas: FontAtlas
}

export default function NameCanvas({sdfFontAtlas, msdfFontAtlas}: NameCanvasProps): ReactElement | null {
	const sdfTextLayout = useMemo(() => bmFontLayout(sdfFontAtlas, name), [sdfFontAtlas])
	const msdfTextLayout = useMemo(() => {
		const layout = bmFontLayout(msdfFontAtlas, name)
		layout.layout.forEach((char) => {
			char.dstU -= layout.paddingLeft / layout.texelW
			char.dstV -= layout.paddingBottom / layout.texelH

			char.dstU *= layout.texelW / sdfTextLayout.texelW
			char.dstWidth *= layout.texelW / sdfTextLayout.texelW
			char.dstV *= layout.texelH / sdfTextLayout.texelH
			char.dstHeight *= layout.texelH / sdfTextLayout.texelH

			char.dstU += sdfTextLayout.paddingLeft / sdfTextLayout.texelW
			char.dstV += sdfTextLayout.paddingBottom / sdfTextLayout.texelH
		})
		return layout
	}, [
		msdfFontAtlas,
		sdfTextLayout.paddingBottom,
		sdfTextLayout.paddingLeft,
		sdfTextLayout.texelH,
		sdfTextLayout.texelW,
	])

	return (
		<div
			className="relative max-h-full min-h-0 w-full min-w-0 max-w-full [container-type:size]"
			style={{aspectRatio: msdfTextLayout.texelW / msdfTextLayout.texelH}}
		>
			<div
				className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
				style={{[`--scale` as any]: `min(239cqw, 523cqh)`, width: `var(--scale)`, height: `var(--scale)`}}
			>
				<Image
					src={nameFallback}
					priority
					alt=""
					unoptimized // My image optimization is better than theirs hahah
					style={{width: `100%`, height: `auto`, position: `absolute`}}
				/>
				<Canvas flat legacy linear gl={{premultipliedAlpha: false}} resize={{offsetSize: true}}>
					<NamePostprocess sdfTextLayout={sdfTextLayout} msdfTextLayout={msdfTextLayout} />
				</Canvas>
			</div>
		</div>
	)
}
