import styled from "styled-components";

export const Title = styled.h1`
    --size: 8rem;

    @media (max-width: 864px) {
        --size: calc(0.18 * var(--c100));
    }

    font-size: var(--size);
    letter-spacing: calc(var(--size) / -14);
    line-height: calc(var(--size) / 1.3);
    margin-bottom: calc(var(--size) * 0.15);
`;

export const TitlePrettyCool = styled(Title)`
    margin-top: 0;
    line-height: 1em;
    margin-bottom: 0;
`;

export const Role = styled.span`
    --size: calc(8rem / 1.9);

    @media (max-width: 864px) {
        --size: calc(0.18 / 1.9 * var(--c100));
    }

    font-size: var(--size);
    letter-spacing: 0px;
    font-weight: 400;
    vertical-align: middle;
    font-family: var(--body-font);
`;

export const Description = styled.p`
    --size: 2.1rem;

    @media (max-width: 864px) {
        --size: calc(0.057 * var(--c100));
    }

    font-size: var(--size);
    font-weight: 400;
    line-height: calc(var(--size) * 1.3);
`;
