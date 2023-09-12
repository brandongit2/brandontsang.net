import NextBundleAnalyzer from "@next/bundle-analyzer"

/** @type {import('next').NextConfig} */
const config = {
	trailingSlash: true,
	transpilePackages: [`three`],
	webpack: (config) => {
		config.module.rules.push({test: /\.glsl$/, use: `raw-loader`})

		const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(`.svg`))
		config.module.rules.push({
			test: /\.svg$/i,
			resourceQuery: {not: /url/}, // exclude if *.svg?url
			use: [{loader: `@svgr/webpack`}],
		})
		fileLoaderRule.exclude = /\.svg$/i

		return config
	},
}

const withBundleAnalyzer = NextBundleAnalyzer({
	enabled: process.env.ANALYZE === `true`,
})
export default withBundleAnalyzer(config)
