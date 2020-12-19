import Head from 'next/head';
import {useEffect, useRef, useState} from 'react';

import styles from './index.module.scss';
import ShadedLetter from '../components/ShadedLetter';
import {clamp} from '../misc/util';

let minLightness = 10;
let maxLightness = 90;

export default function Home() {
    const [text, setText] = useState('Click to edit me!');
    const [mousePos, setMousePos] = useState([0, 0]);
    const [selection, setSelection] = useState([0, 0]);
    const [color, setColor] = useState({hue: 0, sat: 50, light: 60});
    let inputRef = useRef(null);

    useEffect(() => {
        function handleMouseMove(evt: MouseEvent) {
            setMousePos([evt.clientX, evt.clientY]);

            if (evt.buttons === 1) {
                setColor((prevColor) => ({
                    hue:
                        prevColor.hue +
                        (evt.movementX / window.innerWidth) * 180,
                    sat: clamp(
                        prevColor.sat -
                            (evt.movementY / window.innerHeight) * 100,
                        0,
                        100
                    ),
                    light: 60
                }));
            }
        }
        document.addEventListener('mousemove', handleMouseMove);

        function handleSelectionChange() {
            setSelection([
                inputRef.current.selectionStart,
                inputRef.current.selectionEnd
            ]);
        }
        document.addEventListener('selectionchange', handleSelectionChange);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener(
                'selectionchange',
                handleSelectionChange
            );
        };
    }, []);

    let lightEnd = `hsl(${color.hue}deg, ${color.sat}%, ${
        (color.light / 100) * maxLightness * 0.4
    }%)`;
    let darkEnd = `hsl(${color.hue}deg, ${color.sat}%, ${
        color.light / 100 + minLightness
    }%)`;

    return (
        <div
            className={styles.container}
            style={{
                background: `
                radial-gradient(${
                    process.browser
                        ? Math.max(window.innerWidth, window.innerHeight) + 'px'
                        : '100vw'
                } at ${mousePos[0]}px ${mousePos[1]}px, ${lightEnd}, ${darkEnd}
            `
            }}
        >
            <Head>
                <title>Shaded Text Demo</title>
                <link
                    rel="stylesheet"
                    href="https://use.typekit.net/lni7lly.css"
                />
            </Head>
            <div style={{position: 'relative'}}>
                <input
                    className={`${styles.title} ${styles.input}`}
                    value={text}
                    onMouseDown={(evt) => {
                        evt.stopPropagation();
                    }}
                    onInput={(evt: React.ChangeEvent<HTMLInputElement>) => {
                        setText(evt.target.value);
                    }}
                    spellCheck="false"
                    ref={inputRef}
                    style={{
                        caretColor: `hsl(${color.hue}deg, ${color.sat}%, ${color.light}%)`
                    }}
                />
                <h1 className={`${styles.title} ${styles.display}`}>
                    {text.split('').map((letter, i) => (
                        <ShadedLetter
                            mousePos={mousePos}
                            maxLightness={maxLightness}
                            minLightness={minLightness}
                            color={color}
                            selected={i >= selection[0] && i < selection[1]}
                            selectionStart={i === selection[0]}
                            selectionEnd={i === selection[1] - 1}
                        >
                            {letter}
                        </ShadedLetter>
                    ))}
                </h1>
            </div>
            <p
                className={styles['info-text']}
                style={{
                    color: `hsl(${color.hue}deg, ${color.sat}%, ${color.light}%)`
                }}
            >
                (Drag on the background to change the color)
            </p>
        </div>
    );
}
