export function clamp(num: number, min: number, max: number) {
    return num <= min ? min : num >= max ? max : num;
}

// First-difference derivative of an array of numbers
export function derivative(arr: number[]) {
    let ddx = [];
    for (let i = 1; i < arr.length; i++) {
        ddx.push(arr[i] - arr[i - 1]);
    }
    return ddx;
}

export function remToPixels(rem: number) {
    return (
        rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
}
