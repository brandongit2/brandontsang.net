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
    height: 100vh;

    @media (min-width: 900px) {
        overflow: auto hidden;
    }

    @media (max-width: 900px) {
        overflow: hidden auto;
    }
`;

const PageContainer = styled.div`
    position: relative;
    display: inline-grid;
    box-sizing: border-box;

    @media (min-width: 901px) {
        grid-auto-flow: column;
        column-gap: 2rem;
        width: max-content;
        height: calc(100% - 4rem);
    }

    @media (max-width: 900px) {
        grid-auto-flow: row;
        row-gap: 2rem;
        padding: 2rem;
    }

    @media (min-width: 701px) {
        margin: 2rem;
        border: 2px solid var(--foreground-color);
        font-size: 1.3rem;
    }
`;

export default function Index() {
    const aboutRef = useRef<HTMLDivElement>(null);
    const workRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);

    // The colors of the different sections of the page.
    const colors = {
        // [backgroundColor, foregroundColor]
        title: [Color("#385168"), Color("#eae607")],
        about: [Color("#45256d"), Color("#45c895")],
        work: [Color("#25324B"), Color("#AFC7DE")],
    };

    const [back, setBack] = useState(colors.title[0]);
    const [fore, setFore] = useState(colors.title[1]);
    const [sidewaysScroll, setSidewaysScroll] = useState(
        process.browser && window.innerWidth > 900
    );

    useEffect(() => {
        function handleResize() {
            setSidewaysScroll(process.browser && window.innerWidth > 900);
        }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useCustomScroll(
        () => [0, scrollerRef.current.scrollWidth - window.innerWidth],
        (pos) => {
            sidewaysScroll &&
                scrollerRef.current.scroll({
                    left: pos,
                });

            // Mix different background colors based on scroll position.
            let midScreen, aboutStart, workStart;
            if (sidewaysScroll) {
                midScreen =
                    scrollerRef.current.scrollLeft + window.innerWidth / 2;
                aboutStart = aboutRef.current.offsetLeft;
                workStart = workRef.current.offsetLeft;
            } else {
                midScreen =
                    scrollerRef.current.scrollTop + window.innerHeight / 2;
                aboutStart = aboutRef.current.offsetTop;
                workStart = workRef.current.offsetTop;
            }

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
        },
        sidewaysScroll
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
