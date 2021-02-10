import Color from "color";
import Head from "next/head";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";

import {About, Footer, Title, Work} from "components/homepage";
import {ThemeColorContext} from "contexts/ThemeColors";
import {useCustomScroll} from "hooks/useCustomScroll";
import {clamp} from "misc/util";

const Scroller = styled.div`
    width: 100vw;
    height: var(--vh);
    overflow: auto hidden;
`;

const PageContainer = styled.div`
    position: relative;
    margin: 2rem;
    display: inline-grid;
    grid-auto-flow: column;
    column-gap: 2rem;
    border: 2px solid var(--foreground-color);
    box-sizing: border-box;
    width: max-content;
    font-size: 1.3rem;
    height: calc(100% - 4rem);
`;

export default function Index() {
    const aboutRef = useRef(null);
    const workRef = useRef(null);
    const scrollerRef = useRef(null);

    // The colors of the different sections of the page.
    const colors = {
        // [backgroundColor, foregroundColor]
        title: [Color("#385168"), Color("#eae607")],
        about: [Color("#45256d"), Color("#45c895")],
        work: [Color("#25324B"), Color("#AFC7DE")],
    };

    const [back, setBack] = useState(colors.title[0]);
    const [fore, setFore] = useState(colors.title[1]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth * window.devicePixelRatio < 800) return;
            document
                .getElementsByTagName("body")[0]
                .style.setProperty("--vh", `${window.innerHeight}px`);
        }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useCustomScroll(
        () => [0, scrollerRef.current.scrollWidth - window.innerWidth],
        (pos) => {
            scrollerRef.current.scroll({
                left: pos,
            });

            // Mix different background colors based on scroll position.
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

            document.body.style.setProperty("--background-color", back.hex());
            document.body.style.setProperty("--foreground-color", fore.hex());
            setBack(back);
            setFore(fore);
        }
    );

    return (
        <ThemeColorContext.Provider value={{back, fore}}>
            <Scroller ref={scrollerRef}>
                <PageContainer>
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
                                : "100vh"};

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
                </PageContainer>
            </Scroller>
        </ThemeColorContext.Provider>
    );
}
