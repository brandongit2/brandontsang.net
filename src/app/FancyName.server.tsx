import {XMLParser} from "fast-xml-parser"
import fs from "fs/promises"
import path from "path"

import type {BMFont} from "@/types/BMFont"
import type {ReactElement} from "react"

import FancyNameClient from "./FancyName.client"

export default async function StaticNameServer(): Promise<ReactElement | null> {
	const fontText = await fs.readFile(path.resolve(__dirname, `../../../public/Righteous-Regular.fnt`), `utf-8`)
	const parser = new XMLParser({ignoreAttributes: false, attributeNamePrefix: ``, parseAttributeValue: true})
	let {font} = parser.parse(fontText) as BMFont

	return <FancyNameClient font={font} />
}
