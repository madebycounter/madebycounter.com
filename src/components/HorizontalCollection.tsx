import React, { useEffect } from "react";
import styled, { css } from "styled-components";

import useSize from "../global/useSize";

type HorizontalCollectionWrapperProps = {
    $scroll: boolean;
};

const HorizontalCollectionWrapper = styled.div<HorizontalCollectionWrapperProps>`
    display: flex;
    gap: 1rem;
    scroll-behavior: smooth;

    ${(props) =>
        props.$scroll &&
        css`
            padding: 1rem;
            overflow-x: scroll;
        `}
`;

type HorizontalCollectionProps = {
    children: React.ReactNode;
    className?: string;
};

export default function HorizontalCollection({
    children,
    className,
}: HorizontalCollectionProps) {
    const [ref, size] = useSize<HTMLDivElement>();

    useEffect(() => {
        if (!ref.current) return;

        const container = ref.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        // Calculate the scrollLeft value to center the content
        const scrollLeft = (scrollWidth - clientWidth) / 2;

        // Set the scrollLeft value to center the content
        container.scrollLeft = scrollLeft;
    }, [size]);

    return (
        <HorizontalCollectionWrapper
            $scroll={size.width < 873}
            className={className}
            ref={ref}
        >
            {children}
        </HorizontalCollectionWrapper>
    );
}
