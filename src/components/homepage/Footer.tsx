import styled from "styled-components";

const Container = styled.div`
    background: var(--foreground-color);
    color: var(--background-color);
    margin: -2rem;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
    row-gap: 1em;
    align-content: center;

    @media (min-width: 901px) {
        width: max-content;
        margin-left: 0px;
    }

    @media (max-width: 900px) {
        margin-top: 0px;
    }
`;

export default function Footer() {
    return (
        <Container>
            <p>Website by Brandon Tsang, 2021.</p>
        </Container>
    );
}
