export function clamp(num: number, min: number, max: number) {
    return num <= min ? min : num >= max ? max : num;
}

export function remToPixels(rem: number) {
    return (
        rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
}
