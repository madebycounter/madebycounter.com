import React from "react";
import styled from "styled-components";

type DisplayMode = "block" | "inline-block" | "unset";

const MarkupSwapWrapper = styled.div<{ $width: number; $display: DisplayMode }>`
    @media (min-width: ${(props) => props.$width}px) {
        > :first-child {
            display: ${(props) => props.$display};
        }

        > :nth-child(2) {
            display: none;
        }
    }

    @media (max-width: ${(props) => props.$width}px) {
        > :first-child {
            display: none;
        }

        > :nth-child(2) {
            display: ${(props) => props.$display};
        }
    }
`;

type MarkupSwapProps = {
    children: React.ReactNode;
    width: number;
    display?: DisplayMode;
};

export default function MarkupSwap({
    children,
    width,
    display = "block",
}: MarkupSwapProps) {
    return (
        <MarkupSwapWrapper $width={width} $display={display}>
            {children}
        </MarkupSwapWrapper>
    );
}
