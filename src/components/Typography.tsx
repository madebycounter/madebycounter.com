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
    margin: 0.5rem 0px;
`;

export const OrderedList = styled.ol`
    padding-left: 20px;
    margin: 0.5rem;

    font-family: ${(props) => props.theme.fonts.body};
    font-size: 1.3rem;
    font-weight: 300;
`;

export const UnorderedList = styled.ul`
    padding-left: 20px;
    margin: 0.5rem;

    font-family: ${(props) => props.theme.fonts.body};
    font-size: 1.3rem;
    font-weight: 300;
`;

export const ListItem = styled.li`
    ${Paragraph} {
        margin: 0;
    }
`;
