import {useMemo} from "react"
import {Matrix3, Vector2} from "three"

export const useDesqueezeAndScaleMatrix = (canvasWidth: number, canvasHeight: number, textAspect: number): Matrix3 =>
	useMemo(() => {
		const canvasAspect = canvasWidth / canvasHeight
		if (canvasAspect > textAspect)
			// prettier-ignore
			return new Matrix3(
				canvasHeight * textAspect, 0, 0,
				0, canvasHeight, 0,
				0, 0, 1,
			)
		else
			// prettier-ignore
			return new Matrix3(
				canvasWidth, 0, 0,
				0, canvasWidth / textAspect, 0,
				0, 0, 1,
			)
	}, [canvasHeight, canvasWidth, textAspect])

export const useCenterTextMatrix = (
	canvasWidth: number,
	canvasHeight: number,
	textWidth: number,
	textHeight: number,
): Matrix3 =>
	useMemo(
		() =>
			// prettier-ignore
			new Matrix3(
				1, 0, (canvasWidth - textWidth) / 2,
				0, 1, (canvasHeight - textHeight) / 2,
				0, 0, 1,
			),
		[canvasHeight, canvasWidth, textHeight, textWidth],
	)

// Combinations & inverses

export const useTextToScreenSpaceMatrix = (canvasWidth: number, canvasHeight: number, textAspect: number): Matrix3 => {
	const desqueezeAndScaleMatrix = useDesqueezeAndScaleMatrix(canvasWidth, canvasHeight, textAspect)
	const textDims = useMemo(() => new Vector2(1, 1).applyMatrix3(desqueezeAndScaleMatrix), [desqueezeAndScaleMatrix])

	const centerTextMatrix = useCenterTextMatrix(canvasWidth, canvasHeight, textDims.x, textDims.y)
	return useMemo(
		() => centerTextMatrix.clone().multiply(desqueezeAndScaleMatrix),
		[centerTextMatrix, desqueezeAndScaleMatrix],
	)
}

export const useScreenToTextSpaceMatrix = (canvasWidth: number, canvasHeight: number, textAspect: number): Matrix3 => {
	const textToScreenSpaceMatrix = useTextToScreenSpaceMatrix(canvasWidth, canvasHeight, textAspect)
	return useMemo(() => textToScreenSpaceMatrix.invert(), [textToScreenSpaceMatrix])
}
