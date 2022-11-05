module.exports = {
	trailingSlash: true,
	experimental: {
		appDir: true,
		fontLoaders: [
			{
				loader: `@next/font/google`,
				// eslint-disable-next-line quotes
				options: {subsets: ["latin"]},
			},
		],
	},
}
