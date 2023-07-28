declare module "load-bmfont" {
	export default function load(opt: string, cb: (err: ErrorEvent | undefined, font: BMFont) => void): void

	export interface BMFont {
		chars: Array<{
			char: number
			chnl: number
			height: number
			id: number
			index: number
			page: number
			width: number
			x: number
			xadvance: number
			xoffset: number
			y: number
			yoffset: number
		}>
		common: {
			alphaChnl: number
			base: number
			blueChnl: number
			greenChnl: number
			lineHeight: number
			packed: number
			pages: number
			redChnl: number
			scaleH: number
			scaleW: number
		}
		info: {
			aa: number
			bold: number
			charset: string
			face: string
			italic: number
			outline: number
			padding: [number, number, number, number]
			size: number
			smooth: number
			spacing: [number, number]
			stretchH: number
			unicode: number
		}
		kernings: Array<{
			amount: number
			first: number
			second: number
		}>
		pages: string[]
	}
}
