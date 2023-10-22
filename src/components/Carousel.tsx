import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import useSize from "../global/useSize";

import { Direction } from "../types";
import Asset from "../types/Asset";
import Media, { AspectRatio } from "./media/Media";

const ImageBlockWrapper = styled.div<{
    $width: number;
    $size: number;
    $gap: number;
}>`
    display: flex;
    gap: ${(props) => props.$gap}px;
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
    aspectRatio: AspectRatio;
    gap: number;
};

function ImageBlock({
    images,
    width,
    size,
    aspectRatio,
    gap,
}: ImageBlockProps) {
    return (
        <ImageBlockWrapper $width={width} $size={size} $gap={gap}>
            {images.map((image, i) => (
                <div>
                    <Media src={image} key={i} aspectRatio={aspectRatio} />
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
    aspectRatio?: AspectRatio;
};

export default function Carousel({
    images,
    direction = "right",
    size = 100,
    gap = 10,
    speed = 50,
    aspectRatio = "original",
}: CarouselProps) {
    const [wrapperRef, wrapperSize] = useSize<HTMLDivElement>();
    const [state, setState] = useState({
        size: 0,
        imageSize: 1,
    });

    useEffect(() => {
        setState({
            ...state,
            size: wrapperSize.width,
        });
    }, [wrapperSize]);

    if (aspectRatio === null) {
        aspectRatio = "original";
    }

    var imageWidths = gap * images.length;

    for (var i = 0; i < images.length; i++) {
        var dimensions = images[i].dimensions;

        if (aspectRatio === "original") {
            imageWidths += (dimensions.width / dimensions.height) * size;
        } else {
            imageWidths += aspectRatio * size;
        }
    }

    var quantity = Math.ceil(state.size / imageWidths) + 1;

    if (isNaN(quantity)) {
        quantity = 0;
    }

    return (
        <CarouselWrapper ref={wrapperRef}>
            <CarouselSlider
                $width={imageWidths}
                $speed={imageWidths / quantity / speed}
            >
                {[...Array(quantity)].map((_, i) => (
                    <ImageBlock
                        key={i}
                        width={imageWidths}
                        images={images}
                        size={size}
                        gap={gap}
                        aspectRatio={aspectRatio}
                    />
                ))}
            </CarouselSlider>
        </CarouselWrapper>
    );
}
