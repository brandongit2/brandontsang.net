import Color from 'color';
import Head from 'next/head';
import {useEffect, useRef, useState} from 'react';

import styles from './index.module.scss';
import {About, Footer, Title, Work} from '../components/homepage';
import {ThemeColorContext} from '../contexts/ThemeColors';
import {useCustomScroll} from '../hooks/useCustomScroll';
import {clamp} from '../misc/util';

export default function Index() {
    const aboutRef = useRef(null);
    const workRef = useRef(null);
    const scrollerRef = useRef(null);

    const colors = {
        title: [Color('#385168'), Color('#eae607')],
        about: [Color('#45256d'), Color('#45c895')],
        work: [Color('#25324B'), Color('#AFC7DE')]
    };

    const [back, setBack] = useState(colors.title[0]);
    const [fore, setFore] = useState(colors.title[1]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth * window.devicePixelRatio < 800) return;
            document
                .getElementsByTagName('body')[0]
                .style.setProperty('--vh', `${window.innerHeight}px`);
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useCustomScroll(
        () => [0, scrollerRef.current.scrollWidth - window.innerWidth],
        (pos) => {
            scrollerRef.current.scroll({
                left: pos
            });

            var midScreen =
                scrollerRef.current.scrollLeft + window.innerWidth / 2;
            var aboutStart = aboutRef.current.offsetLeft;
            var workStart = workRef.current.offsetLeft;

            let aboutAmt = clamp((midScreen - aboutStart + 75) / 150, 0, 1);
            let workAmt = clamp((midScreen - workStart + 75) / 150, 0, 1);

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
    );

    return (
        <ThemeColorContext.Provider value={{back, fore}}>
            <div className={styles.scroller} ref={scrollerRef}>
                <div className={styles.pageContainer}>
                    <Head>
                        <title>Brandon Tsang</title>
                        <meta
                            name="viewport"
                            content="initial-scale=1.0, width=device-width"
                        />
                    </Head>
                    <style jsx global>{`
                        body {
                            --background-color: ${colors.title[0]};
                            --foreground-color: ${colors.title[1]};
                            --vh: ${process.browser
                                ? `${window.innerHeight}px`
                                : '100vh'};

                            font-family: mostra-nuova;
                            background: var(--background-color);
                            color: var(--foreground-color);
                            overflow: hidden;
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
            </div>
        </ThemeColorContext.Provider>
    );
}
