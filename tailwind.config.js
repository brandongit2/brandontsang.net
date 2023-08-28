/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [`./src/**/*.{js,ts,jsx,tsx,mdx}`],
	theme: {
		extend: {
			colors: {
				bg: `oklch(var(--bg-color) / <alpha-value>)`,
				text: `oklch(var(--text-color) / <alpha-value>)`,
			},
		},
	},
	plugins: [`prettier-plugin-tailwindcss`],
}
