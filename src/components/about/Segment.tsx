import React from "react";
import styled from "styled-components";

import { HorizontalDirection } from "../../types";

type AcceptsDirection = {
    $direction: HorizontalDirection;
};

const SegmentWrapper = styled.div<AcceptsDirection>`
    width: 100%;
    display: flex;
    flex-direction: ${({ $direction }) =>
        $direction === "left" ? "row" : "row-reverse"};
    align-items: center;
    padding: 100px 0;
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
