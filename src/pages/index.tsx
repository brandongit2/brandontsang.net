import Head from 'next/head';
import {useEffect, useState} from 'react';

import styles from './index.module.scss';
import ShadedLetter from '../components/ShadedLetter';

let minLightness = 10;
let maxLightness = 90;

export default function Home() {
    const [text, setText] = useState('Click to edit me!');
    const [mousePos, setMousePos] = useState([0, 0]);

    useEffect(() => {
        function handleMouseMove(evt: MouseEvent) {
            setMousePos([evt.clientX, evt.clientY]);
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            className={styles.container}
            style={{
                background: `
                radial-gradient(${
                    process.browser
                        ? Math.max(window.innerWidth, window.innerHeight) + 'px'
                        : '100vw'
                } at ${mousePos[0]}px ${mousePos[1]}px, hsl(0deg, 0%, ${
                    maxLightness / 4
                }%), hsl(0deg, 0%, ${minLightness}%))
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
                    onInput={(evt: React.ChangeEvent<HTMLInputElement>) => {
                        setText(evt.target.value);
                    }}
                    spellCheck="false"
                />
                <h1 className={`${styles.title} ${styles.display}`}>
                    {text.split('').map((letter) => (
                        <ShadedLetter
                            mousePos={mousePos}
                            maxLightness={maxLightness}
                            minLightness={minLightness}
                        >
                            {letter}
                        </ShadedLetter>
                    ))}
                </h1>
            </div>
        </div>
    );
}
