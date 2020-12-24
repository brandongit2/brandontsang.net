import Color from 'color';
import Head from 'next/head';
import {useEffect, useRef, useState} from 'react';

import styles from './index.module.scss';
import {About, Footer, Title, Work} from '../components/homepage';
import {ThemeColorContext} from '../contexts/ThemeColors';
import {clamp} from '../misc/util';

export default function Index() {
    const aboutRef = useRef(null);
    const workRef = useRef(null);

    const colors = {
        title: [Color('#ffc5cd'), Color('#006600')],
        about: [Color('#1548f8'), Color('#f9bd05')],
        work: [Color('#000000'), Color('#de3d3c')]
    };

    const [back, setBack] = useState(colors.title[0]);
    const [fore, setFore] = useState(colors.title[1]);

    useEffect(() => {
        const scrollThreshold = 150; // in pixels
        function handleScroll() {
            let aboutAmt = clamp(
                -(
                    aboutRef.current.getBoundingClientRect().left -
                    window.innerWidth / 2 -
                    scrollThreshold / 2
                ) / scrollThreshold,
                0,
                1
            );
            let workAmt = clamp(
                -(
                    workRef.current.getBoundingClientRect().left -
                    window.innerWidth / 2 -
                    scrollThreshold / 2
                ) / scrollThreshold,
                0,
                1
            );

            let back = colors.title[0]
                .mix(colors.about[0], aboutAmt)
                .mix(colors.work[0], workAmt);
            let fore = colors.title[1]
                .mix(colors.about[1], aboutAmt)
                .mix(colors.work[1], workAmt);

            document.body.style.setProperty('--background-color', back.hex());
            document.body.style.setProperty('--foreground-color', fore.hex());
            setBack(back);
            setFore(fore);
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <ThemeColorContext.Provider value={{back, fore}}>
            <div className={styles['page-container']}>
                <Head>
                    <title>Brandon Tsang</title>
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                </Head>
                <style jsx global>{`
                    html {
                        height: 100%;
                    }

                    body {
                        --background-color: #ffc5cd;
                        --foreground-color: #006600;

                        font-family: mostra-nuova;
                        background: var(--background-color);
                        color: var(--foreground-color);
                        width: min-content;
                        height: 100%;
                    }

                    #__next {
                        height: 100%;
                        display: inline-block;
                    }

                    a:link,
                    a:visited {
                        color: inherit;
                    }
                `}</style>
                <Title />
                <About ref={aboutRef} />
                <Work ref={workRef} />
                <Footer />
            </div>
        </ThemeColorContext.Provider>
    );
}
