import React, { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ParallaxWrapper = styled.div`
    position: sticky;
    top: 0;
`;

type ParallaxProps = {
    children: React.ReactNode;
    driverRef: React.RefObject<HTMLDivElement>;
    offset?: number;
    className?: string;
};

export default function Parallax({
    children,
    driverRef,
    offset = 0,
    className,
}: ParallaxProps) {
    const drivenRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => {
            // The treatment of offset here isn't quite right, but it works for now.

            if (!driverRef.current) return;
            if (!drivenRef.current) return;

            var progress =
                (window.scrollY - (driverRef.current.offsetTop + offset)) /
                (driverRef.current.offsetHeight - window.innerHeight);

            var mainOffset =
                (drivenRef.current.offsetHeight - window.innerHeight) *
                progress;

            console.log(progress);

            if (drivenRef.current.offsetHeight - offset < window.innerHeight) {
                mainOffset = 0;
            }

            drivenRef.current.style.top = `-${mainOffset + offset}px`;
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [offset]);

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
