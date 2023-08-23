export type FontAtlas = {
	atlas: {
		type: "hardmask" | "softmask" | "sdf" | "psdf" | "msdf" | "mtsdf"
		distanceRange: number
		size: number
		width: number
		height: number
		yOrigin: "top" | "bottom"
	}
	metrics: {
		emSize: number
		lineHeight: number
		ascender: number
		descender: number
		underlineY: number
		underlineThickness: number
	}
	glyphs: Array<
		| {
				unicode: number
				advance: number
		  }
		| {
				unicode: number
				advance: number
				planeBounds: {
					left: number
					bottom: number
					right: number
					top: number
				}
				atlasBounds: {
					left: number
					bottom: number
					right: number
					top: number
				}
		  }
	>
	kerning: Array<{
		unicode1: number
		unicode2: number
		advance: number
	}>
}
