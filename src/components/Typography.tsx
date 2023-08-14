import styled from "styled-components";

export const Paragraph = styled.p`
    color: ${({ theme }) => theme.color};
    font-family: ${({ theme }) => theme.fonts.body};
    font-style: normal;
    line-height: normal;
    font-weight: 400;

    font-size: 2rem;

    @media (max-width: 1200px) {
        font-size: 1.5rem;
    }
`;
