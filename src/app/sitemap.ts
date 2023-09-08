import type {MetadataRoute} from "next"

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `https://www.brandontsang.net`,
			lastModified: new Date(),
			changeFrequency: `daily`,
			priority: 1,
		},
		{
			url: `https://www.brandontsang.net/sprintzero`,
			lastModified: new Date(),
			changeFrequency: `daily`,
			priority: 0.8,
		},
		{
			url: `https://www.brandontsang.net/hemlane-marketing`,
			lastModified: new Date(),
			changeFrequency: `daily`,
			priority: 0.8,
		},
	]
}
