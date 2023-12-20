import styled from "styled-components";

import { Heading1, Paragraph } from "../Typography";

export const Nametag = styled(Heading1)`
    font-size: 8rem;
    line-height: 0.8em;

    @media (max-width: 850px) {
        font-size: 19vw;
    }
`;

export const DippedNametag = styled(Nametag)`
    padding-bottom: 0.1em;
`;

export const BioParagraph = styled(Paragraph)`
    font-size: 2rem;
    line-height: 1.3em;
`;

export const BioParagraphMobile = styled(Paragraph)`
    font-size: 5.2vw;
    line-height: 1.3em;
`;
