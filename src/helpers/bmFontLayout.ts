import type {BMFont} from "@/types/BMFont"

export type CharData = {
	u: number
	v: number
	width: number
	height: number
	dstU: number
	dstV: number
}

export default function bmFontLayout(font: BMFont[`font`], str: string): CharData[] {
	let charData: CharData[] = []
	let cursorX = 0
	let cursorY = 0
	let xOffset = 0
	let yOffset = 0
	for (let i = 0; i < str.length; i++) {
		const char = str[i]
		if (char === `\n`) {
			cursorX = 0
			cursorY += font.common.lineHeight
			continue
		}
		const glyph = font.chars.char.find((c) => c.id === char.charCodeAt(0))!
		const kerning = font.kernings.kerning.find(
			(k) => k.first === char.charCodeAt(i) && k.second === char.charCodeAt(i + 1),
		)

		cursorX += glyph.xoffset
		if (cursorX < 0) xOffset = Math.max(xOffset, -cursorX)
		if (cursorY < 0) yOffset = Math.max(yOffset, -cursorY)
		charData.push({
			u: glyph.x / font.common.scaleW,
			v: 1 - (glyph.y + glyph.height) / font.common.scaleH,
			width: glyph.width / font.common.scaleW,
			height: glyph.height / font.common.scaleH,
			dstU: cursorX / font.common.scaleW,
			dstV: 1 - (cursorY + glyph.height) / font.common.scaleH,
		})
		cursorX -= glyph.xoffset
		cursorX += glyph.xadvance + (kerning?.amount ?? 0)
	}

	charData.forEach((data) => {
		data.dstU += xOffset / font.common.scaleW
		data.dstV += yOffset / font.common.scaleH
	})

	return charData
}
