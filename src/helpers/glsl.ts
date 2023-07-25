// Identity function to aid the glsl-literal VS Code extension in identifying GLSL strings
// https://marketplace.visualstudio.com/items?itemName=boyswan.glsl-literal
const glsl = (strings: TemplateStringsArray, ...expr: string[]): string =>
	strings.reduce((prev, cur, i) => prev + cur + expr[i - 1])

export default glsl
