import {minBy} from "lodash-es"

import type {FontAtlas} from "@/types/FontAtlas"

export type CharData = {
	charCode: number
	u: number
	v: number
	width: number
	height: number
	dstU: number
	dstV: number
	dstWidth: number
	dstHeight: number
}

export type TextLayout = {
	layout: CharData[]
	texelW: number
	texelH: number
	paddingLeft: number
	paddingBottom: number
}

export default function bmFontLayout(font: FontAtlas, str: string): TextLayout {
	let charData: CharData[] = []
	let cursorX = 0
	let cursorY = 0

	const lines = str.split(`\n`)
	lines.forEach((line) => {
		for (let i = line.length - 1; i >= 0; i--) {
			const char = line[i]
			const glyph = font.glyphs.find((c) => c.unicode === char.charCodeAt(0))!
			if (glyph.unicode === 32) {
				cursorX -= glyph.advance
				continue
			}
			if (!(`planeBounds` in glyph)) throw null // Force discriminated union narrowing
			const kerning = font.kerning.find(
				(k) => i < line.length - 1 && k.unicode1 === line.charCodeAt(i) && k.unicode2 === line.charCodeAt(i + 1),
			)

			cursorX -= glyph.advance
			cursorX -= kerning?.advance ?? 0
			charData.push({
				charCode: line.charCodeAt(i),
				u: glyph.atlasBounds.left / font.atlas.width,
				v: glyph.atlasBounds.bottom / font.atlas.height,
				width: (glyph.atlasBounds.right - glyph.atlasBounds.left) / font.atlas.width,
				height: (glyph.atlasBounds.top - glyph.atlasBounds.bottom) / font.atlas.height,
				dstU: cursorX + glyph.planeBounds.left,
				dstV: cursorY + glyph.planeBounds.bottom,
				dstWidth: glyph.planeBounds.right - glyph.planeBounds.left,
				dstHeight: glyph.planeBounds.top - glyph.planeBounds.bottom,
			})
		}

		cursorX = 0
		cursorY -= font.metrics.lineHeight * 0.7
	})

	const leftmostCharacter = minBy(charData, (c) => c.dstU)!
	const leftmostGlyph = font.glyphs
		.filter((c): c is Extract<FontAtlas["glyphs"][number], {planeBounds: any}> => `planeBounds` in c)
		.find((c) => c.unicode === leftmostCharacter.charCode)!
	const paddingLeft = -leftmostGlyph.planeBounds.left
	const bottommostCharacter = minBy(charData, (c) => c.dstV)!
	const bottommostGlyph = font.glyphs
		.filter((c): c is Extract<FontAtlas["glyphs"][number], {planeBounds: any}> => `planeBounds` in c)
		.find((c) => c.unicode === bottommostCharacter.charCode)!
	const paddingBottom = -bottommostGlyph.planeBounds.bottom

	// Scale destination UV dimensions to 1 (square)
	const u1 = Math.min(...charData.map((c) => c.dstU))
	const u2 = Math.max(...charData.map((c) => c.dstU + c.dstWidth))
	const v1 = Math.min(...charData.map((c) => c.dstV))
	const v2 = Math.max(...charData.map((c) => c.dstV + c.dstHeight))
	const textLeft = Math.min(u1, u2)
	const textBottom = Math.min(v1, v2)
	const textWidth = Math.abs(u2 - u1)
	const textHeight = Math.abs(v2 - v1)
	charData.forEach((data) => {
		data.dstU = (data.dstU - textLeft) / textWidth
		data.dstV = (data.dstV - textBottom) / textHeight
		data.dstWidth /= textWidth
		data.dstHeight /= textHeight
	})

	return {layout: charData, texelW: textWidth, texelH: textHeight, paddingLeft, paddingBottom}
}
