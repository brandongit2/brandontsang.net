import {XMLParser} from "fast-xml-parser"
import fs from "fs/promises"
import path from "path"

import type {BMFont, BMFontRaw} from "@/types/BMFont"

export async function loadMsdfFont(): Promise<BMFont> {
	const fontText = await fs.readFile(path.resolve(__dirname, `../../../public/Righteous-Regular-msdf.fnt`), `utf-8`)
	const parser = new XMLParser({ignoreAttributes: false, attributeNamePrefix: ``, parseAttributeValue: true})
	let fontRaw = parser.parse(fontText) as BMFontRaw
	return fontDataFormatter(fontRaw)
}

export async function loadSdfFont(): Promise<BMFont> {
	const fontText = await fs.readFile(path.resolve(__dirname, `../../../public/Righteous-Regular-sdf.fnt`), `utf-8`)
	const parser = new XMLParser({ignoreAttributes: false, attributeNamePrefix: ``, parseAttributeValue: true})
	let fontRaw = parser.parse(fontText) as BMFontRaw
	return fontDataFormatter(fontRaw)
}

function fontDataFormatter(font: BMFontRaw): BMFont {
	return {
		...font.font,
		info: {
			...font.font.info,
			padding: font.font.info.padding.split(`,`).map((p) => parseInt(p)) as [number, number, number, number],
		},
		pages: font.font.pages.page,
		chars: font.font.chars.char,
		kernings: font.font.kernings.kerning,
	}
}
