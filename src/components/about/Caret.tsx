import React from "react";
import styled from "styled-components";

import CaretImg from "../../images/caret.png";

interface StyledCaretProps {
    size?: string;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
}

const StyledCaret = styled.div<StyledCaretProps>`
    position: absolute;

    ${({ left }) => left && `left: ${left};`}
    ${({ right }) => right && `right: ${right};`}
    ${({ top }) => top && `top: ${top};`}
    ${({ bottom }) => bottom && `bottom: ${bottom};`}

    img {
        filter: ${({ theme }) => theme.imageFilter};
        width: ${({ size }) => size};
        height: ${({ size }) => size};
    }

    animation: bounce 2s ease infinite;

    position: absolute;
    z-index: 1;

    &:hover {
        filter: brightness(0.6);
    }

    @keyframes bounce {
        0% {
            transform: translateY(0);
        }

        25% {
            transform: translateY(-10px);
        }

        50% {
            transform: translateY(0);
        }
    }
`;

interface CaretProps {
    href: string;
    size: string;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
}

const Caret = ({ href, size, left, right, top, bottom }: CaretProps) => {
    return (
        <StyledCaret {...{ size, left, right, top, bottom }}>
            <a href={href}>
                <img src={CaretImg} alt="" />
            </a>
        </StyledCaret>
    );
};

export default Caret;
