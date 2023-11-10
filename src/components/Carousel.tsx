import React, { useRef, useState } from "react";
import styled from "styled-components";

import useSafeId from "../global/useSafeId";
import useSize from "../global/useSize";

import Asset from "../types/Asset";
import { FixedHeightGallery } from "./media/Gallery";
import Media, { AspectRatio } from "./media/Media";

const CarouselWrapper = styled.div`
    overflow: hidden;
`;

type CarouselSliderProps = {
    $width: number;
    $speed: number;
    $id: string;
};

const CarouselSlider = styled.div<CarouselSliderProps>`
    display: flex;
    animation: ${(props) => "carousel-" + props.$id} ${(props) => props.$speed}s
        linear infinite;

    > * {
        flex-shrink: 0;
    }

    @keyframes ${(props) => "carousel-" + props.$id} {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-${(props) => props.$width}px);
        }
    }
`;

const CarouselItem = styled.div<{ $gap: number }>`
    margin-right: ${(props) => props.$gap}px;
`;

type CarouselProps = {
    child: React.ReactNode;
    childSize: number;
    gap: number;
    speed: number;
};

export default function Carousel({
    child,
    childSize,
    gap,
    speed,
}: CarouselProps) {
    const id = useSafeId();
    const [ref, size] = useSize<HTMLDivElement>();
    const trueChildSize = childSize + gap;

    var quantity = Math.ceil(size.width / trueChildSize) + 1;

    console.log(quantity, trueChildSize);

    if (isNaN(quantity) || quantity === Infinity) {
        quantity = 0;
    }

    return (
        <CarouselWrapper ref={ref}>
            <CarouselSlider
                $id={id}
                $width={trueChildSize}
                $speed={trueChildSize / speed}
            >
                {[...Array(quantity)].map((_, i) => (
                    <CarouselItem key={i} $gap={gap}>
                        {child}
                    </CarouselItem>
                ))}
            </CarouselSlider>
        </CarouselWrapper>
    );
}

type FixedGalleryCarouselProps = {
    images: Asset[];
    targetHeight: number;
    speed?: number;
    gap?: number;
    columnWidth?: number;
    onClick?: (src: string) => void;
};

export function FixedGalleryCarousel({
    images,
    targetHeight,
    speed = 100,
    gap = 8,
    columnWidth = 300,
    onClick,
}: FixedGalleryCarouselProps) {
    const [columns, setColumns] = useState(1);
    const size = columns * (columnWidth + gap) - gap;

    console.log(columns, size);

    return (
        <>
            <Carousel
                child={
                    <FixedHeightGallery
                        images={images}
                        targetHeight={targetHeight}
                        gap={gap}
                        columnWidth={columnWidth}
                        onClick={onClick}
                        setColumns={setColumns}
                    />
                }
                childSize={size}
                gap={gap}
                speed={speed}
            />
        </>
    );
}

type ImageBlockWrapperProps = {
    $width: number;
    $size: number;
    $gap: number;
};

const ImageBlockWrapper = styled.div<ImageBlockWrapperProps>`
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

type ImageCarouselProps = {
    images: Asset[];
    size?: number;
    gap?: number;
    speed?: number;
    aspectRatio?: AspectRatio;
};

export function ImageCarousel({
    images,
    size = 100,
    gap = 10,
    speed = 50,
    aspectRatio = "original",
}: ImageCarouselProps) {
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

    return (
        <Carousel
            child={
                <ImageBlock
                    width={imageWidths}
                    images={images}
                    size={size}
                    gap={gap}
                    aspectRatio={aspectRatio}
                />
            }
            childSize={imageWidths}
            gap={0}
            speed={speed}
        />
    );
}
