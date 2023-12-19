import React from "react";
import styled from "styled-components";

type DisplayMode = "block" | "inline-block" | "unset" | "flex" | "grid";

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
    className?: string;
};

export default function MarkupSwap({
    children,
    width,
    display = "block",
    className,
}: MarkupSwapProps) {
    return (
        <MarkupSwapWrapper
            $width={width}
            $display={display}
            className={className}
        >
            {children}
        </MarkupSwapWrapper>
    );
}

export const MobileSplit = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 2rem;

    > * {
        flex: 1;
    }

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;
