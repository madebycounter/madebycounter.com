import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Direction } from "../types";
import Asset from "../types/Asset";
import Media from "./media/Media";

const ImageBlockWrapper = styled.div<{ $width: number; $size: number }>`
    display: flex;
    gap: 10px;
    width: ${(props) => props.$width}px;

    > div {
        flex-shrink: 0;
        flex-grow: 0;
        height: ${(props) => props.$size}px;
    }
`;

type ImageBlockProps = {
    images: Asset[];
    width: number;
    size: number;
};

function ImageBlock({ images, width, size }: ImageBlockProps) {
    return (
        <ImageBlockWrapper $width={width} $size={size}>
            {images.map((image, i) => (
                <div>
                    <Media src={image} key={i} aspectRatio={"original"} />
                </div>
            ))}
        </ImageBlockWrapper>
    );
}

const CarouselWrapper = styled.div`
    resize: both;
    overflow: hidden;
`;

const CarouselSlider = styled.div<{ $width: number; $speed: number }>`
    display: flex;
    animation: move ${(props) => props.$speed}s linear infinite;

    > * {
        flex-shrink: 0;
    }

    @keyframes move {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-${(props) => props.$width}px);
        }
    }
`;

type CarouselProps = {
    images: Asset[];
    direction?: Direction;
    size?: number;
    gap?: number;
    speed?: number;
};

export default function Carousel({
    images,
    direction = "right",
    size = 100,
    gap = 10,
    speed = 100,
}: CarouselProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState({
        size: 0,
        imageSize: 1,
    });

    function onResize() {
        if (!wrapperRef.current) return;

        const { width, height } = wrapperRef.current.getBoundingClientRect();

        setState({
            ...state,
            size: width,
        });
    }

    useEffect(() => {
        const wrapperObserver = new ResizeObserver(onResize);
        wrapperObserver.observe(wrapperRef.current as HTMLDivElement);

        return () => {
            wrapperRef.current && wrapperObserver.unobserve(wrapperRef.current);
        };
    }, []);

    useEffect(onResize, [wrapperRef.current, state.imageSize]);

    var imageWidths = gap * images.length;

    for (var i = 0; i < images.length; i++) {
        var dimensions = images[i].dimensions;
        imageWidths += (dimensions.width / dimensions.height) * size;
    }

    var quantity = Math.ceil(state.size / imageWidths) + 1;

    return (
        <CarouselWrapper ref={wrapperRef}>
            <CarouselSlider $width={imageWidths} $speed={imageWidths / speed}>
                {[...Array(quantity)].map((_, i) => (
                    <ImageBlock
                        key={i}
                        width={imageWidths}
                        images={images}
                        size={size}
                    />
                ))}
            </CarouselSlider>
        </CarouselWrapper>
    );
}
