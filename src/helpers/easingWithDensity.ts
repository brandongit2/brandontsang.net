type EasingFunction = (x: number) => number
type Sample = {
	adjustedT: number
	y: number
}

export const easingWithDensity = (numSamples: number, easingFuncInv: EasingFunction): Sample[] => {
	let samples: Sample[] = []

	for (let i = 0; i < numSamples; i++) {
		const y = i / (numSamples - 1)
		const weightedY = y * y * y

		samples.push({adjustedT: easingFuncInv(weightedY), y: weightedY})
	}

	samples.sort(({adjustedT: a}, {adjustedT: b}) => (a < b ? -1 : a > b ? 1 : 0))
	// Set the y values to the average of the current and next y values. Makes more sense since each sample actually represents a range.
	// The reason I don't use the true value of y, recalculated from the easing function, is because it's more of an antialiasing thing than a true value.
	samples = samples.map(({adjustedT, y}, i) => {
		const nextY = samples[i + 1]?.y ?? 1
		return {adjustedT, y: (y + nextY) / 2}
	})
	return samples
}

export const easeInCubic = (x: number): number => Math.pow(x, 3)
export const easeInCubicInv = (y: number): number => Math.pow(y, 1 / 3)

export const easeInOutQuad = (x: number): number => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)
export const easeInOutQuadInv = (y: number): number =>
	y < 0.5 ? Math.sqrt(y / 2) : 1 - (Math.sqrt(2) * Math.sqrt(1 - y)) / 2
