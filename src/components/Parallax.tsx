import React, { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ParallaxWrapper = styled.div`
    position: sticky;
    top: 0;
`;

type ParallaxProps = {
    children: React.ReactNode;
    className?: string;
    driverRef: React.RefObject<HTMLDivElement>;
};

export default function Parallax({
    children,
    className,
    driverRef,
}: ParallaxProps) {
    const drivenRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => {
            if (!driverRef.current) return;
            if (!drivenRef.current) return;

            var progress =
                (window.scrollY - driverRef.current.offsetTop) /
                (driverRef.current.offsetHeight - window.innerHeight);

            var offset =
                (drivenRef.current.offsetHeight - window.innerHeight) *
                progress;

            if (drivenRef.current.offsetHeight < window.innerHeight) {
                offset = 0;
            }

            drivenRef.current.style.top = `-${offset}px`;
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <ParallaxWrapper className={className} ref={drivenRef}>
            {children}
        </ParallaxWrapper>
    );
}

const ParallaxDriverWrapper = styled.div``;

type ParallaxDriverProps = {
    children: React.ReactNode;
    className?: string;
};

export const ParallaxDriver = forwardRef(function (
    { children, className }: ParallaxDriverProps,
    ref: React.Ref<HTMLDivElement>,
) {
    return (
        <ParallaxDriverWrapper className={className} ref={ref}>
            {children}
        </ParallaxDriverWrapper>
    );
});
