import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ParallaxWrapper = styled.div`
    position: sticky;
    top: 0;
`;

type ParallaxProps = {
    children: React.ReactNode;
    className?: string;
};

export default function Parallax({ children, className }: ParallaxProps) {
    return <ParallaxWrapper className={className}>{children}</ParallaxWrapper>;
}

type ParallaxScrollerProps = ParallaxProps & {
    parallaxRef: React.RefObject<HTMLDivElement>;
};

export function ParallaxScroller({
    children,
    className,
}: ParallaxScrollerProps) {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => setOffset(window.scrollY);
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);
}
