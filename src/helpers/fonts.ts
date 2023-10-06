/* eslint-disable @typescript-eslint/quotes */

import localFont from "next/font/local"

export const figtree = localFont({
	src: [
		{
			path: "../../public/fonts/Figtree-VariableFont_wght-instance.subset.woff2",
			style: "normal",
			weight: "300 700",
		},
		{
			path: "../../public/fonts/Figtree-Italic-VariableFont_wght-instance.subset.woff2",
			style: "italic",
			weight: "300 700",
		},
	],
	variable: "--font-figtree",
})

export const karrik = localFont({
	src: [
		{path: "../../public/fonts/Karrik-Regular.woff2", style: "normal"},
		{path: "../../public/fonts/Karrik-Italic.woff2", style: "italic"},
	],
	variable: "--font-karrik",
})

export const playfair = localFont({
	src: "../../public/fonts/Playfair-Italic-VariableFont_opsz,wdth,wght-instance.subset.woff2",
	weight: "700",
})
