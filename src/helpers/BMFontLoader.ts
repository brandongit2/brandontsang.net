import loadBMFont from "load-bmfont"
import {Loader} from "three"

import type {Loader as LoaderType} from "@react-three/fiber"
import type {BMFont} from "load-bmfont"
import type {LoadingManager} from "three"

export default class BMFontLoader extends Loader implements LoaderType<BMFont> {
	manager: LoadingManager

	load(
		url: string,
		onLoad: (font: BMFont) => void,
		onProgress?: (event: ProgressEvent) => void,
		onError?: (event: ErrorEvent) => void,
	): void {
		loadBMFont(url, (err, font) => {
			if (err) {
				onError?.(err)
				return
			}

			onLoad(font)
		})
	}

	async loadAsync(url: string, onLoad: (data: unknown) => void): Promise<BMFont> {
		return new Promise((resolve, reject) => {
			this.load(
				url,
				(font) => {
					onLoad(font)
					resolve(font)
				},
				undefined,
				reject,
			)
		})
	}
}
