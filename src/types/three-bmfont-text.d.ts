import {BufferGeometry} from "three"

import type {Layout} from "layout-bmfont-text"
import type {BMFont} from "load-bmfont"

declare module "three-bmfont-text" {
	export interface CreateTextGeometryOptions {
		flipY?: boolean
		multipage?: boolean

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

	class TextGeometry extends BufferGeometry {
		constructor(opt: CreateTextGeometryOptions | string)
		update(opt: CreateTextGeometryOptions | string): void
		layout: Layout
		visibleGlyphs: Layout["glyphs"]
	}

	export default function createText(opt: CreateTextGeometryOptions | string): TextGeometry
}
