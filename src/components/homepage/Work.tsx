import {forwardRef, useContext} from "react";
import styled from "styled-components";

import {WorkCard} from "./";
import {ThemeColorContext} from "contexts/ThemeColors";
import {useShadow} from "hooks/useShadow";

const Container = styled.div`
    position: relative;
    display: grid;
    place-items: stretch;
    grid-gap: 2rem;

    @media (min-width: 901px) {
        grid-auto-flow: column;
        grid-template-rows: 1fr 1fr;
        grid-auto-columns: min-content;
    }
`;

const Header = styled.h1`
    @media (min-width: 901px) {
        grid-row: 1 / 3;
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        align-self: start;
        font-size: 4em;
    }

    @media (max-width: 900px) {
        font-size: 3em;
    }
`;

const Work = forwardRef<HTMLDivElement>((props, forwardedRef) => {
    const {back, fore} = useContext(ThemeColorContext);
    const shadow = useShadow(
        15,
        process.browser && window.innerWidth > 900 ? 240 : 135,
        fore,
        back
    );

    return (
        <Container ref={forwardedRef}>
            <Header style={{textShadow: shadow}}>My Work</Header>
            <WorkCard
                url="https://brandontsang.net"
                repo="https://github.com/brandongit2/brandontsang.net"
                title="brandontsang.net"
                description="My personal portfolio site."
                techStack={["typescript", "react", "nextjs"]}
            />
            <WorkCard
                url="https://texitor.brandontsang.net"
                repo="https://github.com/brandongit2/Texitor"
                title="Texitor"
                description="A new take on WYSIWYG text editors."
                techStack={["typescript", "react", "redux", "firebase"]}
            />
            <WorkCard
                url="https://frogdromeda.com"
                repo="https://github.com/frogdromeda"
                title="Frogdromeda"
                description="A video game about a frog in outer space."
                techStack={["typescript", "react", "nextjs", "godot"]}
            />
        </Container>
    );
});

export default Work;
