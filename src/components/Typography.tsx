import styled from "styled-components";

export const Paragraph = styled.p`
    font-family: ${(props) => props.theme.fonts.body};
    font-weight: 300;

    font-size: 1.3rem;

    margin: 1rem 0;
`;

export const Heading1 = styled.h1`
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: 400;

    font-size: min(4rem, 12vw);
    line-height: 1em;
    letter-spacing: -0.04em;
`;

export const Heading2 = styled.h2`
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: 400;

    font-size: 2rem;
    line-height: 1em;
    letter-spacing: -0.04em;
`;

export const Heading3 = styled.h3`
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: 400;

    font-size: 1.6rem;
    line-height: 1em;
    letter-spacing: -0.04em;
`;
