import {useContext} from "react";
import styled from "styled-components";

import {ThemeColorContext} from "contexts/ThemeColors";

const Container = styled.div`
    position: relative;
    width: 40rem;
    display: flex;
    justify-content: stretch;
    background: white;
    overflow: hidden;
`;

const SiteContainer = styled.div`
    overflow: hidden;
    flex-grow: 1;
`;

const Preview = styled.iframe`
    border: none;
    width: 200%;
    height: 200%;
    transform: scale(0.5) translate(-50%, -50%);
    pointer-events: none;
`;

const Info = styled.div`
    position: absolute;
    left: 0px;
    bottom: 0px;
    z-index: 2;
    width: calc(100% - 2rem);
    height: calc(30% - 2rem);
    padding: 1rem;
`;

const Shadow = styled.div`
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: calc(30% - 160px);
`;

interface SitePreviewProps {
    src: string;
}

function SitePreview({src}: SitePreviewProps) {
    return (
        <SiteContainer>
            <Preview src={src} />
        </SiteContainer>
    );
}

interface WorkCardProps {
    title: string;
    url: string;
}

export default function WorkCard({title, url}: WorkCardProps) {
    const {back} = useContext(ThemeColorContext);

    return (
        <Container>
            <SitePreview src={url} />
            <Shadow
                style={{
                    background: back.string(),
                    boxShadow: `0px 0px 70px 140px ${back.string()}`,
                }}
            />
            <Info>
                <h1>{title}</h1>
                <div></div>
            </Info>
        </Container>
    );
}
