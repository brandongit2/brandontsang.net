import {useContext} from 'react';

import styles from './Title.module.scss';
import {ThemeColorContext} from '../../contexts/ThemeColors';
import {useShadow} from '../../hooks/useShadow';
import ColoredImg from '../ColoredImg';

export default function Title() {
    const {back, fore} = useContext(ThemeColorContext);

    const shadowHeight = process.browser && window.innerWidth < 800 ? 15 : 20;
    const shadow = useShadow(shadowHeight, 135, fore, back);

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
                UI/UX designer and front-end web developer.
            </h2>
            <div className={styles.action}>
                <div>
                    <p>Scroll to read more</p>
                    <p className={styles.useArrowKeys}>
                        (Or use your arrow keys)
                    </p>
                </div>
                <ColoredImg
                    src="right-arrow.svg"
                    color="var(--foreground-color)"
                    height="1em"
                    className={styles.arrow}
                />
            </div>
        </div>
    );
}
