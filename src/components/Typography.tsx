import styled from "styled-components";

export const Paragraph = styled.p`
    color: ${({ theme }) => theme.color};
    font-family: ${(props) => props.theme.fonts.body};
    font-weight: 300;
    font-size: 1.3rem;
    line-height: 1.5em;

    margin: 1rem 0;
`;

export const Tags = styled.p`
    color: ${({ theme }) => theme.color};
    font-size: 1rem;
    line-height: 1em;
    font-weight: 300;

    > * {
        white-space: nowrap;
    }
`;

export const Heading1 = styled.h1`
    color: ${({ theme }) => theme.color};
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: 400;
    font-size: min(4rem, 12vw);

    line-height: 1em;
    letter-spacing: -0.04em;
`;

export const Heading2 = styled.h2`
    color: ${({ theme }) => theme.color};
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: 400;
    font-size: 2rem;

    line-height: 1em;
    letter-spacing: -0.04em;
`;

export const Heading3 = styled.h3`
    color: ${({ theme }) => theme.color};
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: 400;
    font-size: 1.6rem;

    line-height: 1em;
    letter-spacing: -0.04em;
    margin: 0.5rem 0px;
`;

export const Heading4 = styled.h4`
    color: ${({ theme }) => theme.color};
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: 400;
    font-size: 1.3rem;

    line-height: 1em;
    letter-spacing: -0.04em;
    margin: 0.5rem 0px;
`;

export const OrderedList = styled.ol`
    color: ${({ theme }) => theme.color};
    padding-left: 20px;
    margin: 0.5rem;

    font-family: ${(props) => props.theme.fonts.body};
    font-size: 1.3rem;
    font-weight: 300;
`;

export const UnorderedList = styled.ul`
    color: ${({ theme }) => theme.color};
    padding-left: 20px;
    margin: 0.5rem;

    font-family: ${(props) => props.theme.fonts.body};
    font-size: 1.3rem;
    font-weight: 300;
`;

export const ListItem = styled.li`
    color: ${({ theme }) => theme.color};

    ${Paragraph} {
        margin: 0;
    }
`;
