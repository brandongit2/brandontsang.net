import {forwardRef} from 'react';

import styles from './About.module.scss';

const About = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div ref={ref} className={styles.container}>
            <h1 className={styles.title}>About Me</h1>
            <div className={styles['canada-overlay']}>
                <div className={styles.montreal} />
            </div>
            <p>
                Hi! I am a UI/UX designer/web developer currently living in
                Montreal. I started programming when I was 12, and have loved
                making websites ever since (I am a wizard at CSS). I am fluent
                in both English and French.
            </p>
            <p>Wanna contact me? Use the links below:</p>
        </div>
    );
});

export default About;
