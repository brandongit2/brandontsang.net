import {useContext} from 'react';

import styles from './Title.module.scss';
import {ThemeColorContext} from '../../contexts/ThemeColors';
import {useShadow} from '../../hooks/useShadow';
import ColoredImg from '../ColoredImg';

export default function Slide1() {
    const {back, fore} = useContext(ThemeColorContext);

    const shadow = useShadow(20, fore, back);

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
            <p className={styles.action}>
                Scroll to read more
                <ColoredImg
                    src="right-arrow.svg"
                    color={fore.string()}
                    height="1em"
                    className={styles.arrow}
                />
            </p>
        </div>
    );
}
