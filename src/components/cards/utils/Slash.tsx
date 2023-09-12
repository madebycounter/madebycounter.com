import styled, { css } from "styled-components";

import { Direction } from "../../../types";

type SlashProps = {
    direction?: Direction.LEFT | Direction.RIGHT;
};

const Slash = styled.div<SlashProps>`
    aspect-ratio: 400 / 1650;

    background-color: ${(props) => props.theme.backgroundColor};
    z-index: 10;

    ${(props) => {
        if (
            props.direction === Direction.LEFT ||
            props.direction === undefined
        ) {
            return css`
                clip-path: polygon(0% 0%, 0% 100%, 100% 0%);
            `;
        } else {
            return css`
                clip-path: polygon(100% 0%, 100% 100%, 0% 100%);
            `;
        }
    }}
`;

export default Slash;
