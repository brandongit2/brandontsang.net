import {useContext} from 'react';

import styles from './Title.module.scss';
import {ThemeColorContext} from '../../contexts/ThemeColors';
import {useShadow} from '../../hooks/useShadow';
import Color from 'color';

export default function Slide1() {
    const {back, fore} = useContext(ThemeColorContext);

    const shadow = useShadow(
        20,
        fore,
        Color({h: 230, s: 100, l: 40}),
        Color({h: 330, s: 100, l: 25}),
        Color({h: 30, s: 100, l: 50}),
        back
    );

    return (
        <div className={styles.container}>
            <h1
                className={styles.title}
                style={{
                    color: fore.string(),
                    textShadow: shadow
                }}
            >
                I'm Brandon Tsang.
            </h1>
            <h2
                className={styles.subtitle}
                style={{
                    color: fore.string(),
                    textShadow: shadow
                }}
            >
                UI/UX designer and full-stack web developer.
            </h2>
            <p className={styles.action} style={{boxShadow: shadow}}>
                Scroll to read more
                <svg viewBox="0 0 476.213 476.213" className={styles.arrow}>
                    <polygon
                        points="345.606,107.5 324.394,128.713 418.787,223.107 0,223.107 0,253.107 418.787,253.107 324.394,347.5 
	345.606,368.713 476.213,238.106"
                        fill="var(--foreground-color)"
                    />
                </svg>
            </p>
        </div>
    );
}
