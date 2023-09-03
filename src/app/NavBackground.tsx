"use client"

import {useRef, type ReactNode, useEffect, useState} from "react"
import {useInterval} from "react-use"

export type NavBackgroundProps = {
	children?: ReactNode
}

export default function NavBackground({children}: NavBackgroundProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const svgContentRef = useRef<HTMLDivElement>(null)

	const [figtreeDataUrl, setFigtreeDataUrl] = useState<string | null>(null)
	useEffect(() => {
		if (figtreeDataUrl) return

		const abortController = new AbortController()
		const signal = abortController.signal

		;(async () => {
			const response = await fetch(`/Figtree-Variable.woff2`, {signal})
			const data = await response.arrayBuffer()
			const base64 = btoa(String.fromCharCode(...new Uint8Array(data)))
			const dataUrl = `data:font/woff2;base64,${base64}`
			setFigtreeDataUrl(dataUrl)
		})()

		return () => abortController.abort()
	}, [figtreeDataUrl])

	const svgImageRef = useRef<HTMLImageElement>(null)
	const [svgStyles, setSvgStyles] = useState(``)
	useEffect(() => {
		if (!svgContentRef.current) return
		const classNamesInUse = new Set<string>()
		const findClassNames = (element: Element) => {
			if (element.classList.length > 0) {
				for (const className of element.classList) classNamesInUse.add(className)
			}
			for (const child of element.children) findClassNames(child)
		}
		findClassNames(svgContentRef.current)
		document.documentElement.classList.forEach((className) => classNamesInUse.add(className))
		document.body.classList.forEach((className) => classNamesInUse.add(className))

		const allStyles = Array.from(document.styleSheets).reduce((prev, curr) => {
			const styleSheetText = Array.from(curr.cssRules)
				.map((rule) => {
					if (rule instanceof CSSFontFaceRule) {
						if (!rule.cssText.toLowerCase().includes(`figtree`)) return ``
						return rule.cssText.replaceAll(/url\(.+?\)/gi, `url(${figtreeDataUrl})`)
					}

					if (rule instanceof CSSStyleRule) {
						const styleMap = rule.styleMap
						const keptStyles = [] as string[]

						const importantStyles = /^(\*|[a-zA-Z]+[0-9]?(:\w+.*)?|::.+)$/
						const isRelevantClassName = rule.selectorText
							.split(`,`)
							.map((s) => s.trim())
							.some((s) => classNamesInUse.has(s.slice(1)) || importantStyles.test(s))
						if (isRelevantClassName)
							styleMap.forEach((value, key) => {
								keptStyles.push(`${key}:${value.map((v) => v.toString()).join(` `)}`)
							})
						else
							styleMap.forEach((value, key) => {
								if (key.startsWith(`--`)) keptStyles.push(`${key}:${value.map((v) => v.toString()).join(` `)}`)
							})

						if (keptStyles.length > 0) return `${rule.selectorText}{${keptStyles.join(`;`)}}`
					}

					return ``
				})
				.filter((rule) => rule.length > 0)
				.join(`\n`)
			return prev + styleSheetText
		}, ``)
		setSvgStyles(allStyles)
	}, [figtreeDataUrl])

	const globallyInheritedStyles = useRef(``)
	useEffect(() => {
		const propNames = [`--bg-color`, `--text-color`]
		const propValues = propNames.map((propName) =>
			getComputedStyle(document.documentElement).getPropertyValue(propName),
		)
		globallyInheritedStyles.current = propNames.map((propName, index) => `${propName}:${propValues[index]}`).join(`;`)
	}, [])

	useInterval(async () => {
		if (!canvasRef.current || !svgContentRef.current || !svgImageRef.current || !globallyInheritedStyles.current) return
		const ctx = canvasRef.current.getContext(`2d`)
		if (!ctx) return

		const svgString =
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 1000">` +
			`<style>${svgStyles}</style>` +
			`<foreignObject width="100%" height="100%">` +
			`<div xmlns="http://www.w3.org/1999/xhtml" class="${
				document.documentElement.getAttribute(`class`) + ` text-text`
			}" style="${globallyInheritedStyles.current}">` +
			`${svgContentRef.current.innerHTML}` +
			`</div>` +
			`</foreignObject>` +
			`</svg>`
		const blob = new Blob([svgString], {type: `image/svg+xml`})
		const url = window.URL.createObjectURL(blob)
		svgImageRef.current.src = url
		ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
		ctx.drawImage(svgImageRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
	}, 1000)

	return (
		<>
			<div className="height-[500px] width-[500px] absolute left-[100vw]" ref={svgContentRef}>
				{children}
			</div>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				alt=""
				ref={svgImageRef}
				width="500"
				height="1000"
				className="absolute left-1/2 top-0 w-[500px] -translate-x-1/2"
			/>

			<canvas ref={canvasRef} className="absolute left-full top-0 h-1/2 w-1/2" />
		</>
	)
}
