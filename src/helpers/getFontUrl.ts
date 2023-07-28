export default function getFontUrl(fontName: string): string {
	for (const styleSheet of Array.from(document.styleSheets)) {
		const cssRules = styleSheet.cssRules
		for (const rule of Array.from(cssRules)) {
			if (rule instanceof CSSFontFaceRule && rule.style.fontFamily === fontName)
				return rule.style.getPropertyValue(`src`)
		}
	}

	return ``
}
