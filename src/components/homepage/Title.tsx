import styles from './Title.module.scss';
import {useShadow} from '../../hooks/useShadow';

export default function Slide1() {
    const fromColor = {hue: 120, sat: 100, light: 20};
    const toColor = {hue: 330, sat: 100, light: 40};

    const titleShadow = useShadow(fromColor, toColor, 20);
    const actionShadow = useShadow(fromColor, toColor, 20);

    return (
        <div className={styles.container}>
            <h1
                className={styles.title}
                style={{
                    color: `hsl(${fromColor.hue}deg, ${fromColor.sat}%, ${fromColor.light}%)`,
                    textShadow: titleShadow
                }}
            >
                I'm Brandon Tsang.
            </h1>
            <h2
                className={styles.subtitle}
                style={{
                    color: `hsl(${fromColor.hue}deg, ${fromColor.sat}%, ${fromColor.light}%)`,
                    textShadow: titleShadow
                }}
            >
                UI/UX designer and full-stack web developer.
            </h2>
            <p className={styles.action} style={{boxShadow: actionShadow}}>
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
