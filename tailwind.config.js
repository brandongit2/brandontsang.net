/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [`./src/**/*.{js,ts,jsx,tsx,mdx}`],
	theme: {
		extend: {
			colors: {
				bg: `var(--bg-color)`,
				text: `var(--text-color)`,
			},
		},
	},
	plugins: [`prettier-plugin-tailwindcss`],
}
