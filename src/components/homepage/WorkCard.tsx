import {useContext} from "react";
import styled from "styled-components";

import {ThemeColorContext} from "contexts/ThemeColors";
import ColoredImg from "components/ColoredImg";

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: stretch;

    @media (min-width: 901px) {
        width: 40rem;
    }

    @media (max-width: 900px) {
        height: 20rem;
    }
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
    width: calc(100% - 3em);
    height: 4em;
    padding: 0.5em 1.5em;
    margin-bottom: 1em;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
`;

const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Shadow = styled.div`
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: calc(6.5em - 160px);
`;

const Border = styled.div`
    position: absolute;
    z-index: -1;
    border: 2px solid var(--foreground-color);
    width: 100%;
    height: 6.5em;
    left: 0px;
    bottom: 0px;
    box-sizing: border-box;
`;

const Links = styled.div`
    flex-grow: 1;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: end;
    column-gap: 1em;
`;

const Link = styled.a`
    display: flex;
    align-items: center;
    text-decoration: underline;
    cursor: pointer;
`;

const IconExternal = styled(ColoredImg)`
    margin-left: 0.3em;
    margin-top: 0.3em;
`;

const TechContainer = styled.div`
    align-self: flex-end;
    display: flex;
`;

const Tech = styled.img`
    height: 1.3em;
    margin: 0px 0.3em;
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
    repo: string;
    title: string;
    description: string;
    techStack: Array<
        "typescript" | "react" | "nextjs" | "redux" | "firebase" | "godot"
    >;
}

export default function WorkCard({
    url,
    repo,
    title,
    description,
    techStack,
}: WorkCardProps) {
    return (
        <Container>
            <Border />
            <SitePreview src={url} />
            <Info>
                <InfoColumn>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </InfoColumn>
                <InfoColumn>
                    <Links>
                        <Link href={url}>
                            visit
                            <IconExternal
                                src="external-link.svg"
                                color="var(--foreground-color)"
                                height="0.6em"
                            />
                        </Link>
                        <Link href={repo}>
                            code
                            <IconExternal
                                src="external-link.svg"
                                color="var(--foreground-color)"
                                height="0.6em"
                            />
                        </Link>
                    </Links>
                    <TechContainer>
                        {techStack.includes("typescript") && (
                            <Tech src="typescript-logo.svg" />
                        )}
                        {techStack.includes("react") && (
                            <Tech src="react-logo.svg" />
                        )}
                        {techStack.includes("redux") && (
                            <Tech src="redux-logo.svg" />
                        )}
                        {techStack.includes("nextjs") && (
                            <Tech src="nextjs-logo.svg" />
                        )}
                        {techStack.includes("firebase") && (
                            <Tech src="firebase-logo.svg" />
                        )}
                        {techStack.includes("godot") && (
                            <Tech src="godot-logo.svg" />
                        )}
                    </TechContainer>
                </InfoColumn>
            </Info>
        </Container>
    );
}
