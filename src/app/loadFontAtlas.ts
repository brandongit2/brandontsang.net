import fs from "fs/promises"
import path from "path"

import type {FontAtlas} from "@/types/FontAtlas"

export async function loadMsdfFontAtlas(): Promise<FontAtlas> {
	const fontText = await fs.readFile(path.resolve(__dirname, `../../../public/Righteous-Regular-msdf.json`), `utf-8`)
	const font = JSON.parse(fontText) as FontAtlas
	return font
}

export async function loadSdfFontAtlas(): Promise<FontAtlas> {
	const fontText = await fs.readFile(path.resolve(__dirname, `../../../public/Righteous-Regular-sdf.json`), `utf-8`)
	const font = JSON.parse(fontText) as FontAtlas
	return font
}
