import { graphql } from "gatsby";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Asset from "../../types/Asset";
import Media from "./Media";

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

type StyledSlideshowProps = {
    $aspectRatio?: number;
};

const StyledSlideshow = styled.div<StyledSlideshowProps>`
    position: relative;
    overflow: hidden;
    width: 100%;
    aspect-ratio: ${(props) => props.$aspectRatio};

    > div {
        position: absolute;
        width: 100%;
        z-index: 0;

        background: ${({ theme }) => theme.backgroundColor};

        &.active {
            z-index: 1;
            opacity: 1;
        }
    }
`;

type SlideshowProps = {
    src: Asset[];
    autoplayDelay?: number;
    autoplayOffset?: number;
    autoplay?: boolean;
    aspectRatio?: number;
    onClick?: (cfid: string) => void;
};

export default function Slideshow({
    src,
    autoplayDelay = 5000,
    autoplayOffset = 0,
    autoplay = true,
    aspectRatio = 16 / 9,
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
        <StyledSlideshow $aspectRatio={aspectRatio}>
            {src.map((slide, idx) => {
                const visible = state.index === idx;
                var className = visible ? "active" : "";

                return (
                    <div className={className} key={idx}>
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

export const query = graphql`
    fragment Slideshow on ContentfulSlideshow {
        contentful_id
        autoplayDelay
        autoplayOffset
        autoplay
        content {
            ...Media
        }
    }
`;
