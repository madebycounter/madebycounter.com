import React from "react";
import styled from "styled-components";

import { Theme } from "../global/themes";

import Revealer from "./Revealer";

type StyledHighlightProps = {
    theme: Theme;
};

const StyledHighlight = styled(Revealer)<StyledHighlightProps>`
    position: relative;
    transition: color ease-in-out 500ms 100ms;
    z-index: 1;

    color: ${({ theme }) => theme.color};

    &:after {
        content: "";
        position: absolute;
        z-index: -1;
        top: 10%;
        left: 0;
        width: 102%;
        height: 90%;
        transition: transform ease-in-out 500ms 100ms;
        transform-origin: left;

        transform: scaleX(0);
        background-color: ${({ theme }) => theme.color};
    }

    &.active {
        color: ${({ theme }) => theme.backgroundColor};

        &:after {
            transform: scaleX(1);
        }
    }
`;

type HighlightProps = {
    children: React.ReactNode;
};

const Highlight = ({ children }: HighlightProps) => {
    return (
        <StyledHighlight scrollOffset={150} asSpan={true}>
            {children}
        </StyledHighlight>
    );
};

export default Highlight;
