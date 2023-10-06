import React from "react";
import styled from "styled-components";

import { HorizontalDirection } from "../../types";

type AcceptsDirection = {
    $direction: HorizontalDirection;
};

export const Bio = styled.div`
    position: relative;
    display: flex;

    // Tablet
    @media (max-width: 1250px) {
        margin: auto;
    }

    // Mobile
    @media (max-width: 850px) {
        margin: 4vw;
    }
`;

export const Spacer = styled.div<{ $width: number }>`
    width: ${(props) => props.$width}px;
`;

export const SegmentWrapper = styled.div<AcceptsDirection>`
    width: 100%;
    display: flex;
    flex-direction: ${({ $direction }) =>
        $direction === "left" ? "row" : "row-reverse"};
    align-items: center;
    padding: 100px 0;

    // Tablet
    @media (max-width: 1250px) {
        flex-direction: column-reverse;
        align-items: stretch;
        gap: 150px;
    }

    @media (max-width: 850px) {
        gap: 20vw;
        padding: 20vw 0;
    }
`;

type SegmentProps = {
    children: React.ReactNode;
    direction?: HorizontalDirection;
};

export default function Segment({
    children,
    direction = "right",
}: SegmentProps) {
    return <SegmentWrapper $direction={direction}>{children}</SegmentWrapper>;
}
