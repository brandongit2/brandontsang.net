export const springVarHelper = (frequency: number, damping: number) => {
	const m = 1
	const k = frequency / m
	const c = damping * 2 * Math.sqrt(frequency)
	return {damping: c, stiffness: k, mass: m}
}
