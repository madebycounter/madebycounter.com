import { graphql } from "gatsby";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Asset from "../../types/Asset";
import Media, { AspectRatio } from "./Media";

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

type StyledSlideshowProps = {
    $aspectRatio: number;
};

const StyledSlideshow = styled.div<StyledSlideshowProps>`
    position: relative;

    aspect-ratio: ${(props) => props.$aspectRatio};
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
    aspectRatio,
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

    if (aspectRatio === null) {
        return <p>Fluid aspect ratios not supported</p>;
    }

    var trueAspectRatio;

    if (aspectRatio === "original") {
        trueAspectRatio = src[0].dimensions.width / src[0].dimensions.height;
    } else {
        trueAspectRatio = aspectRatio as number;
    }

    return (
        <StyledSlideshow $aspectRatio={trueAspectRatio} className={className}>
            {src.map((slide, idx) => {
                const visible = state.index === idx;
                var divClassName = visible ? "active" : "";

                return (
                    <div className={divClassName} key={idx}>
                        <Media
                            key={idx}
                            src={slide}
                            aspectRatio={null}
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
