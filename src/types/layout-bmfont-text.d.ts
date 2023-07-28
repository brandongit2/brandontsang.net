import type {BMFont} from "load-bmfont"

declare module "layout-bmfont-text" {
	export interface Glyph {
		index: number
		data: BMFont["chars"][number]
		position: [number, number]
		line: number
	}

	export interface CreateLayoutOptions {
		font: BMFont
		text: string
		width?: number
		mode?: string
		align?: string
		letterSpacing?: number
		lineHeight?: number
		tabSize?: number
		start?: number
		end?: number
	}

	class Layout {
		constructor(opt: CreateLayoutOptions)

		update(opt: CreateLayoutOptions): void

		glyphs: Glyph[]
		width: number
		height: number

		baseline: number
		xHeight: number
		descender: number
		ascender: number
		capHeight: number
		lineHeight: number
	}

	export default function createLayout(opt: CreateLayoutOptions): Layout
}
