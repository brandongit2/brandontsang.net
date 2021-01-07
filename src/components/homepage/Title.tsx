import {useContext} from 'react';

import styles from './Title.module.scss';
import {ThemeColorContext} from '../../contexts/ThemeColors';
import {useShadow} from '../../hooks/useShadow';
import ColoredImg from '../ColoredImg';

export default function Title() {
    const {back, fore} = useContext(ThemeColorContext);

    const shadowHeight = process.browser && window.innerWidth < 800 ? 15 : 20;
    const shadow = useShadow(shadowHeight, fore, back);

    return (
        <div className={styles.container}>
            <h1
                className={styles.title}
                style={{
                    textShadow: shadow
                }}
            >
                I'm Brandon Tsang.
            </h1>
            <h2
                className={styles.subtitle}
                style={{
                    textShadow: shadow
                }}
            >
                UI/UX designer and full-stack web developer.
            </h2>
            <p className={styles.action}>
                Scroll to read more
                <ColoredImg
                    src="right-arrow.svg"
                    color="var(--foreground-color)"
                    height="1em"
                    className={styles.arrow}
                />
            </p>
        </div>
    );
}
