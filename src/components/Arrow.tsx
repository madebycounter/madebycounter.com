import styled, { css } from "styled-components";

import { HorizontalDirection } from "../types";

type ArrowProps = { $inverted?: boolean; $direction: HorizontalDirection };

const Arrow = styled.div<ArrowProps>`
    height: 100%;
    aspect-ratio: 16 / 46;

    ${(props) => {
        if (props.$inverted === undefined || props.$inverted === false) {
            return css`
                background-color: ${(props) => props.theme.color};
            `;
        } else {
            return css`
                background-color: ${(props) => props.theme.backgroundColor};
            `;
        }
    }}

    ${(props) => {
        switch (props.$direction) {
            case "right":
                return css`
                    clip-path: polygon(
                        -5% 0%,
                        0% 0%,
                        100% 50%,
                        0% 100%,
                        -5% 100%
                    );
                `;
            case "left":
                return css`
                    clip-path: polygon(
                        105% 0%,
                        100% 0%,
                        0% 50%,
                        100% 100%,
                        105% 100%
                    );
                `;
        }
    }}
`;

export default Arrow;
