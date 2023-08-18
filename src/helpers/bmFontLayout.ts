import type {BMFont} from "@/types/BMFont"

export type CharData = {
	u: number
	v: number
	width: number
	height: number
	dstU: number
	dstV: number
	dstWidth: number
	dstHeight: number
}

export default function bmFontLayout(font: BMFont[`font`], str: string): CharData[] {
	let charData: CharData[] = []
	let cursorX = 0
	let cursorY = 0
	let xOffset = 0
	let yOffset = 0

	const lines = str.split(`\n`)
	lines.forEach((line) => {
		for (let i = line.length - 1; i >= 0; i--) {
			const char = line[i]
			const glyph = font.chars.char.find((c) => c.id === char.charCodeAt(0))!
			const kerning = font.kernings.kerning.find(
				(k) => i > 0 && k.second === line.charCodeAt(i) && k.first === line.charCodeAt(i - 1),
			)

			cursorX += glyph.xoffset
			cursorX -= glyph.xadvance
			if (cursorX + glyph.width > 0) xOffset = Math.max(xOffset, cursorX + glyph.width)
			if (cursorY < 0) yOffset = Math.max(yOffset, -cursorY)
			charData.push({
				u: glyph.x / font.common.scaleW,
				v: 1 - (glyph.y + glyph.height) / font.common.scaleH,
				width: glyph.width / font.common.scaleW,
				height: glyph.height / font.common.scaleH,
				dstU: cursorX / font.common.scaleW,
				dstV: 1 - (cursorY + glyph.height) / font.common.scaleH,
				dstWidth: glyph.width / font.common.scaleW,
				dstHeight: glyph.height / font.common.scaleH,
			})
			cursorX -= glyph.xoffset + (kerning?.amount ?? 0)
		}

		cursorX = 0
		cursorY += font.common.lineHeight
	})

	charData.forEach((data) => {
		data.dstU -= xOffset / font.common.scaleW
		data.dstV += yOffset / font.common.scaleH
	})

	// Everything so far has generated the text just left of x=0. Push it to the right.
	const textWidth = -Math.min(...charData.map((c) => c.dstU))
	charData.forEach((data) => {
		data.dstU += textWidth
	})

	return charData
}
