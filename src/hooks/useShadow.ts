interface ColorHSL {
    hue: number;
    sat: number;
    light: number;
}

export function useShadow(
    fromColor: ColorHSL,
    toColor: ColorHSL,
    height: number
) {
    const shadowsPerPixel = 2;
    const slant = 135 * (Math.PI / 180);

    let shadow = '';
    let numShadows = height * shadowsPerPixel;
    for (let i = 0; i < numShadows; i++) {
        let prog = i / numShadows;

        let x = prog * height * Math.cos(slant);
        let y = prog * height * Math.sin(slant);

        let hue = prog * (toColor.hue - fromColor.hue) + fromColor.hue;
        let sat = prog * (toColor.sat - fromColor.sat) + fromColor.sat;
        let light = prog * (toColor.light - fromColor.light) + fromColor.light;

        let newShadow = `${
            shadow === '' ? '' : ','
        }${x}px ${y}px 0.5px hsla(${hue}deg,${sat}%, ${light}%)`;
        shadow += newShadow;
    }
    return shadow;
}
