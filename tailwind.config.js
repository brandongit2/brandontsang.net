/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [`./src/**/*.{js,ts,jsx,tsx,mdx}`],
	theme: {
		fontFamily: {
			figtree: [`var(--font-figtree)`, `sans-serif`],
			karrik: [`var(--font-karrik)`, `sans-serif`],
		},
		screens: {
			tablet: `700px`,
			full: `1330px`,
		},
		extend: {
			colors: {
				bg: `oklch(var(--bg-color) / <alpha-value>)`,
				text: `oklch(var(--text-color) / <alpha-value>)`,
			},
		},
	},
	plugins: [`prettier-plugin-tailwindcss`],
}
