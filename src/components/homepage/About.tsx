import {forwardRef} from "react";
import styled from "styled-components";

import ColoredImg from "../ColoredImg";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
    row-gap: 1em;
    align-content: center;
    width: 40rem;
`;

const MontrealDot = styled.div`
    width: 10px;
    height: 10px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: red;
    position: absolute;
    top: 84.4%;
    left: calc(50% + 300px / 1.1826 * 0.35);
`;

const ContactLinks = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ContactLink = styled.a`
    display: flex;
    align-items: center;
    margin-right: 1em;
`;

const ContactLogo = styled(ColoredImg)`
    margin-right: 0.5em;
`;

const About = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <Container ref={ref}>
            <ColoredImg
                src="canada.png"
                color={"var(--foreground-color)"}
                height="300px"
            >
                <MontrealDot />
            </ColoredImg>
            <p>
                Hi! I am a UI/UX designer and web developer currently living in
                Montreal. I started programming when I was 12, and have loved
                making websites ever since (I am a wizard at CSS). I am fluent
                in both English and French.
            </p>
            <p>Wanna contact me? Use the links below:</p>
            <ContactLinks>
                <ContactLink
                    href="https://github.com/brandongit2"
                    target="_blank"
                >
                    <ContactLogo
                        src="github-logo.svg"
                        color={"var(--foreground-color)"}
                        height="1em"
                    />
                    <span>brandongit2</span>
                </ContactLink>
                <ContactLink
                    href="https://www.linkedin.com/in/brandontsang2/"
                    target="_blank"
                >
                    <ContactLogo
                        src="linkedin-logo.svg"
                        color={"var(--foreground-color)"}
                        height="1em"
                    />
                    <span>Brandon Tsang</span>
                </ContactLink>
                <ContactLink
                    href="mailto:brandononline2@gmail.com"
                    target="_blank"
                >
                    <ContactLogo
                        src="email.svg"
                        color={"var(--foreground-color)"}
                        height="1em"
                    />
                    <span>brandononline2@gmail.com</span>
                </ContactLink>
            </ContactLinks>
        </Container>
    );
});

export default About;
