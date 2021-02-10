import {useContext} from "react";
import styled from "styled-components";

import {ThemeColorContext} from "contexts/ThemeColors";

const Container = styled.div`
    position: relative;
    width: 40rem;
    display: flex;
    justify-content: stretch;
`;

const SiteContainer = styled.div`
    position: relative;
    overflow: hidden;
    flex-grow: 1;
    margin: 0px 1rem;
    margin-bottom: 1rem;
    background: white;
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
    width: 100%;
    height: 5rem;
    padding: 0.5rem 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Shadow = styled.div`
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: calc(7rem - 160px);
`;

const Border = styled.div`
    position: absolute;
    z-index: -1;
    border: 2px solid var(--foreground-color);
    width: 100%;
    height: 7rem;
    left: 0px;
    bottom: 0px;
    box-sizing: border-box;
`;

interface SitePreviewProps {
    src: string;
}

function SitePreview({src}: SitePreviewProps) {
    const {back} = useContext(ThemeColorContext);

    return (
        <SiteContainer>
            <Preview src={src} />
            <Shadow
                style={{
                    background: back.string(),
                    boxShadow: `0px 0px 60px 120px ${back.string()}`,
                }}
            />
        </SiteContainer>
    );
}

interface WorkCardProps {
    url: string;
    title: string;
    description: string;
}

export default function WorkCard({url, title, description}: WorkCardProps) {
    return (
        <Container>
            <Border />
            <SitePreview src={url} />
            <Info>
                <h1>{title}</h1>
                <p>{description}</p>
            </Info>
        </Container>
    );
}
