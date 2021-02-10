import {useContext} from "react";
import styled from "styled-components";

import ColoredImg from "../ColoredImg";
import {ThemeColorContext} from "contexts/ThemeColors";
import {useShadow} from "hooks/useShadow";

const Container = styled.div`
    width: calc(100vw - 4.5rem);
    padding-left: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: relative;
`;

const TitleText = styled.h1`
    font-weight: 700;
    font-size: 7em;
    line-height: 1em;
    margin-bottom: 0.1em;
    color: var(--foreground-color);
`;

const SubtitleText = styled.h2`
    font-size: 3em;
`;

const Hint = styled.div`
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    display: flex;
    align-items: center;
`;

const Arrow = styled(ColoredImg)`
    vertical-align: bottom;
    margin-left: calc(0.5em + 0.2em);
    margin-right: 0.2em;
    position: relative;
    animation: arrow-movement 1s cubic-bezier(0.36, 0.11, 0.65, 0.93) alternate
        infinite;

    @keyframes arrow-movement {
        $movement-amt: 0.1em;

        from {
            left: -$movement-amt;
        }

        to {
            left: $movement-amt;
        }
    }
`;

const UseArrowKeys = styled.p`
    opacity: 0.7;
    font-size: 0.7em;
`;

export default function Title() {
    const {back, fore} = useContext(ThemeColorContext);

    const shadowHeight = process.browser && window.innerWidth < 800 ? 15 : 20;
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
        </Container>
    );
}
