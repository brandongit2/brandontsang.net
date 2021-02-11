import {useContext} from "react";
import styled, {keyframes} from "styled-components";

import ColoredImg from "../ColoredImg";
import {ThemeColorContext} from "contexts/ThemeColors";
import {useShadow} from "hooks/useShadow";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: relative;

    @media (min-width: 901px) {
        width: calc(100vw - 4.5rem);
    }

    @media (max-width: 900px) {
        height: calc(100vh - 4rem);
    }
`;

const TitleText = styled.h1`
    font-weight: 700;
    font-size: 6em;
    line-height: 1em;
    margin-bottom: 0.1em;
    color: var(--foreground-color);

    @media (min-width: 901px) {
        margin-left: 0.5rem;
    }

    @media (max-width: 1200px) {
        font-size: 5em;
    }

    @media (max-width: 900px) {
        font-size: 4em;
    }

    @media (max-width: 800px) {
        font-size: 3em;
    }

    @media (max-width: 600px) {
        font-size: 3em;
    }
`;

const SubtitleText = styled.h2`
    font-size: 2.5em;

    @media (min-width: 901px) {
        margin-left: 0.5rem;
    }

    @media (max-width: 1200px) {
        font-size: 2em;
    }

    @media (max-width: 900px) {
        font-size: 1.66em;
    }

    @media (max-width: 800px) {
        font-size: 1.2em;
    }

    @media (max-width: 600px) {
        font-size: 1em;
    }
`;

const Hint = styled.div`
    position: absolute;
    bottom: 0px;
    display: flex;
    align-items: center;
`;

const arrowMovement = keyframes`
    from {
        left: -0.1em;
    }

    to {
        left: 0.1em;
    }
`;

const Arrow = styled(ColoredImg)`
    vertical-align: bottom;
    margin-left: calc(0.5em + 0.2em);
    margin-right: 0.2em;
    position: relative;
    animation: ${arrowMovement} 1s cubic-bezier(0.36, 0.11, 0.65, 0.93)
        alternate infinite;
`;

const UseArrowKeys = styled.p`
    opacity: 0.7;
    font-size: 0.7em;
`;

export default function Title() {
    const {back, fore} = useContext(ThemeColorContext);

    const shadowHeight =
        process.browser && window.innerWidth > 1200
            ? 20
            : process.browser && window.innerWidth > 600
            ? 12
            : 8;
    const shadow = useShadow(shadowHeight, 135, fore, back);

    return (
        <Container>
            <TitleText
                style={{
                    textShadow: shadow,
                }}
            >
                I'm Brandon Tsang.
            </TitleText>
            <SubtitleText
                style={{
                    textShadow: shadow,
                }}
            >
                UI/UX designer and front-end web developer.
            </SubtitleText>
            {process.browser && window.innerWidth > 900 ? (
                <Hint>
                    <div>
                        <p>Scroll to read more</p>
                        <UseArrowKeys>(Or use your arrow keys)</UseArrowKeys>
                    </div>
                    <Arrow
                        src="right-arrow.svg"
                        color="var(--foreground-color)"
                        height="1em"
                    />
                </Hint>
            ) : null}
        </Container>
    );
}
