export type BMFont = {
	font: {
		info: {
			face: string
			size: number
			bold: number
			italic: number
			charset: string
			unicode: number
			stretchH: number
			smooth: number
			aa: number
			padding: string
			spacing: string
			outline: number
		}
		common: {
			lineHeight: number
			base: number
			scaleW: number
			scaleH: number
			pages: number
			packed: number
			alphaChnl: number
			redChnl: number
			greenChnl: number
			blueChnl: number
		}
		pages: {
			page: {
				id: number
				file: string
			}
		}
		distanceField: {
			fieldType: string
			distanceRange: number
		}
		chars: {
			char: Array<{
				id: number
				index: number
				char: string
				width: number
				height: number
				xoffset: number
				yoffset: number
				xadvance: number
				chnl: number
				x: number
				y: number
				page: number
			}>
		}
		kernings: {
			kerning: Array<{
				first: number
				second: number
				amount: number
			}>
		}
	}
}