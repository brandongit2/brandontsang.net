import Color from 'color';

export function useShadow(height: number, angle: number, ...colors: Color[]) {
    const shadowsPerPixel = 1.5;
    const slant = angle * (Math.PI / 180);

    let shadow = '';
    let numShadows = height * shadowsPerPixel;
    for (let i = 0; i < numShadows; i++) {
        let prog = i / numShadows;

        let x = prog * height * Math.cos(slant);
        let y = prog * height * Math.sin(slant);

        let firstColor = colors[Math.floor(prog * (colors.length - 1))];
        let secondColor = colors[Math.ceil(prog * (colors.length - 1))];
        let colorProg =
            (prog % (1 / (colors.length - 1))) * (colors.length - 1);
        let color = firstColor.mix(secondColor, colorProg);

        let newShadow = `${
            shadow === '' ? '' : ','
        }${x}px ${y}px 0px ${color.string()}`;
        shadow += newShadow;
    }
    return shadow;
}
