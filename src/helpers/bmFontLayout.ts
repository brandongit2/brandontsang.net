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

export type TextLayout = {
	layout: CharData[]
	texelW: number
	texelH: number
	innerTextWidth: number
}

export default function bmFontLayout(font: BMFont, str: string): TextLayout {
	let charData: CharData[] = []
	let cursorX = 0
	let cursorY = font.common.base
	let innerTextWidth = 0

	const lines = str.split(`\n`)
	lines.forEach((line) => {
		for (let i = line.length - 1; i >= 0; i--) {
			const char = line[i]
			const glyph = font.chars.find((c) => c.id === char.charCodeAt(0))!
			const kerning = font.kernings.find(
				(k) => i > 0 && k.second === line.charCodeAt(i) && k.first === line.charCodeAt(i - 1),
			)

			cursorX -= glyph.xadvance
			charData.push({
				u: glyph.x / font.common.scaleW,
				v: 1 - (glyph.y + glyph.height) / font.common.scaleH,
				width: glyph.width / font.common.scaleW,
				height: glyph.height / font.common.scaleH,
				dstU: cursorX + glyph.xoffset,
				dstV: 1 - (cursorY + glyph.yoffset) - glyph.height,
				dstWidth: glyph.width,
				dstHeight: glyph.height,
			})
			cursorX -= kerning?.amount ?? 0
			// cursorX += 0.28 // Not sure why this is necessary
		}

		innerTextWidth = Math.max(innerTextWidth, -cursorX)
		cursorX = 0
		cursorY += font.common.lineHeight
	})

	const u1 = Math.min(...charData.map((c) => c.dstU))
	const u2 = Math.max(...charData.map((c) => c.dstU + c.dstWidth))
	const v1 = Math.min(...charData.map((c) => c.dstV))
	const v2 = Math.max(...charData.map((c) => c.dstV + c.dstHeight))
	const textLeft = Math.min(u1, u2)
	const textBottom = Math.min(v1, v2)
	const textWidth = Math.abs(u2 - u1)
	const textHeight = Math.abs(v2 - v1)

	// Scale destination UV dimensions to 1 (square)
	charData.forEach((data) => {
		data.dstU = (data.dstU - textLeft) / textWidth
		data.dstV = (data.dstV - textBottom) / textHeight
		data.dstWidth /= textWidth
		data.dstHeight /= textHeight
	})

	return {layout: charData, texelW: textWidth, texelH: textHeight, innerTextWidth}
}
