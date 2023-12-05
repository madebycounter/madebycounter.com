import { graphql } from "gatsby";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Asset from "../../types/Asset";
import Media, { AspectRatio } from "./Media";

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

const StyledSlideshow = styled.div`
    position: relative;

    width: 100%;
    height: 100%;

    > div {
        position: absolute;
        z-index: 0;

        width: 100%;
        height: 100%;

        background: ${({ theme }) => theme.backgroundColor};

        &.active {
            z-index: 1;
            opacity: 1;
        }
    }
`;

type SlideshowProps = {
    src: Asset[];
    className?: string;
    autoplayDelay?: number;
    autoplayOffset?: number;
    autoplay?: boolean;
    aspectRatio?: AspectRatio;
    onClick?: (cfid: string) => void;
};

export default function Slideshow({
    src,
    autoplayDelay = 5000,
    autoplayOffset = 0,
    autoplay = true,
    aspectRatio = "original",
    className,
    onClick,
}: SlideshowProps) {
    const firstRender = useRef(true);
    const [state, setState] = useState({
        index: 0,
    });

    const navigate = (delta: number) => {
        if (src.length <= 1) return;

        setState({
            index: mod(state.index + delta, src.length),
        });
    };

    useEffect(() => {
        if (!autoplay) return;

        var timeout: NodeJS.Timeout;

        if (firstRender.current) {
            firstRender.current = false;
            timeout = setTimeout(() => navigate(1), autoplayOffset);
        } else {
            timeout = setTimeout(() => navigate(1), autoplayDelay);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [state.index]);

    return (
        <StyledSlideshow className={className}>
            {src.map((slide, idx) => {
                const visible = state.index === idx;
                var divClassName = visible ? "active" : "";

                return (
                    <div className={divClassName} key={idx}>
                        <Media
                            key={idx}
                            src={slide}
                            aspectRatio={aspectRatio}
                            videoPlaying={visible}
                            videoLoop={src.length == 1}
                            onVideoEnd={() => navigate(1)}
                            onClick={onClick}
                        />
                    </div>
                );
            })}
        </StyledSlideshow>
    );
}
