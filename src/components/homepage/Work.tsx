import {forwardRef, useContext} from 'react';
import styled from 'styled-components';

import {WorkCard} from './';
import {ThemeColorContext} from 'contexts/ThemeColors';
import {useShadow} from 'hooks/useShadow';

const Container = styled.div`
    position: relative;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: 1fr 1fr;
    grid-auto-columns: min-content;
    place-items: stretch;
    padding: 2rem;
    grid-gap: 2rem;
`;

const Header = styled.h1`
    grid-row: 1 / 3;
    font-size: 4em;
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    align-self: start;
`;

const Work = forwardRef<HTMLDivElement>((props, forwardedRef) => {
    const {back, fore} = useContext(ThemeColorContext);
    const shadow = useShadow(15, 240, fore, back);

    return (
        <Container ref={forwardedRef}>
            <Header style={{textShadow: shadow}}>My Work</Header>
            <WorkCard title="brandontsang.net" url="https://brandontsang.net" />
            <WorkCard title="Texitor" url="https://texitor.brandontsang.net" />
            <WorkCard title="Frogdromeda" url="https://frogdromeda.com" />
        </Container>
    );
});

export default Work;
