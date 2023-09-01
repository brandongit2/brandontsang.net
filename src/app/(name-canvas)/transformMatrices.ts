import {useMemo} from "react"
import {Matrix3, Vector2} from "three"

export const useDesqueezeAndScaleMatrix = (
	canvasWidthNoMargin: number,
	canvasHeightNoMargin: number,
	textAspect: number,
): Matrix3 =>
	useMemo(() => {
		const canvasAspect = canvasWidthNoMargin / canvasHeightNoMargin
		if (canvasAspect > textAspect)
			// prettier-ignore
			return new Matrix3(
				canvasWidthNoMargin, 0, 0,
				0, canvasWidthNoMargin / textAspect, 0,
				0, 0, 1,
			)
		else
			// prettier-ignore
			return new Matrix3(
				canvasHeightNoMargin * textAspect, 0, 0,
				0, canvasHeightNoMargin, 0,
				0, 0, 1,
			)
	}, [canvasHeightNoMargin, canvasWidthNoMargin, textAspect])

export const useCenterTextMatrix = (
	canvasWidthNoMargin: number,
	canvasHeightNoMargin: number,
	textWidth: number,
	textHeight: number,
): Matrix3 =>
	useMemo(
		() =>
			// prettier-ignore
			new Matrix3(
				1, 0, (canvasWidthNoMargin - textWidth) / 2,
				0, 1, (canvasHeightNoMargin - textHeight) / 2,
				0, 0, 1,
			),
		[canvasHeightNoMargin, canvasWidthNoMargin, textHeight, textWidth],
	)

export const useApplyMarginMatrix = (marginSize: number): Matrix3 =>
	useMemo(
		() =>
			// prettier-ignore
			new Matrix3(
				1, 0, marginSize,
				0, 1, marginSize,
				0, 0, 1,
			),
		[marginSize],
	)

// Combinations & inverses

export const useTextToScreenSpaceMatrix = (
	canvasWidth: number,
	canvasHeight: number,
	textAspect: number,
	canvasMargin: number,
): Matrix3 => {
	const canvasWidthNoMargin = canvasWidth - canvasMargin * 2
	const canvasHeightNoMargin = canvasHeight - canvasMargin * 2

	const desqueezeAndScaleMatrix = useDesqueezeAndScaleMatrix(canvasWidthNoMargin, canvasHeightNoMargin, textAspect)
	const textDims = useMemo(() => new Vector2(1, 1).applyMatrix3(desqueezeAndScaleMatrix), [desqueezeAndScaleMatrix])

	const centerTextMatrix = useCenterTextMatrix(canvasWidthNoMargin, canvasHeightNoMargin, textDims.x, textDims.y)
	const applyMarginMatrix = useApplyMarginMatrix(canvasMargin)
	return useMemo(
		() => applyMarginMatrix.clone().multiply(centerTextMatrix).multiply(desqueezeAndScaleMatrix),
		[applyMarginMatrix, centerTextMatrix, desqueezeAndScaleMatrix],
	)
}

export const useScreenToTextSpaceMatrix = (
	canvasWidthNoMargin: number,
	canvasHeightNoMargin: number,
	textAspect: number,
	canvasMargin: number,
): Matrix3 => {
	const textToScreenSpaceMatrix = useTextToScreenSpaceMatrix(
		canvasWidthNoMargin,
		canvasHeightNoMargin,
		textAspect,
		canvasMargin,
	)
	return useMemo(() => textToScreenSpaceMatrix.invert(), [textToScreenSpaceMatrix])
}
