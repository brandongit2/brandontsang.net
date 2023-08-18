import {XMLParser} from "fast-xml-parser"
import fs from "fs/promises"
import path from "path"

import type {BMFont} from "@/types/BMFont"

export async function loadFont(): Promise<BMFont["font"]> {
	const fontText = await fs.readFile(path.resolve(__dirname, `../../../public/Righteous-Regular.fnt`), `utf-8`)
	const parser = new XMLParser({ignoreAttributes: false, attributeNamePrefix: ``, parseAttributeValue: true})
	let {font} = parser.parse(fontText) as BMFont
	return font
}
