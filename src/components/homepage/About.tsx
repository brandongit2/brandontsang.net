import {forwardRef} from 'react';

import styles from './About.module.scss';
import ColoredImg from '../ColoredImg';

const About = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div ref={ref} className={styles.container}>
            <h1 className={styles.title}>About Me</h1>
            <ColoredImg
                src="canada.png"
                color={'var(--foreground-color)'}
                height="300px"
                style={{marginBottom: '1rem'}}
            >
                <div className={styles.montreal} />
            </ColoredImg>
            <p>
                Hi! I am a UI/UX designer and web developer currently living in
                Montreal. I started programming when I was 12, and have loved
                making websites ever since (I am a wizard at CSS). I am fluent
                in both English and French.
            </p>
            <p>Wanna contact me? Use the links below:</p>
            <div className={styles['contact-links']}>
                <a
                    href="https://github.com/brandongit2"
                    target="_blank"
                    className={styles['contact-link']}
                >
                    <ColoredImg
                        src="github-logo.svg"
                        color={'var(--foreground-color)'}
                        height="1em"
                        className={styles['contact-logo']}
                    />
                    <span>brandongit2</span>
                </a>
                <a
                    href="https://www.linkedin.com/in/brandontsang2/"
                    target="_blank"
                    className={styles['contact-link']}
                >
                    <ColoredImg
                        src="linkedin-logo.svg"
                        color={'var(--foreground-color)'}
                        height="1em"
                        className={styles['contact-logo']}
                    />
                    <span>Brandon Tsang</span>
                </a>
                <a
                    href="mailto:brandononline2@gmail.com"
                    target="_blank"
                    className={styles['contact-link']}
                >
                    <ColoredImg
                        src="email.svg"
                        color={'var(--foreground-color)'}
                        height="1em"
                        className={styles['contact-logo']}
                    />
                    <span>brandononline2@gmail.com</span>
                </a>
            </div>
        </div>
    );
});

export default About;
