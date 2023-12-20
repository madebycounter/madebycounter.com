import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import useSafeId from "../global/useSafeId";
import useSize, { useWindowSize } from "../global/useSize";

import Asset from "../types/Asset";
import {
    Direction,
    HorizontalDirection,
    isHorizontal,
} from "../types/directions";
import { HorizontalGallery } from "./media/Gallery";
import Media, { AspectRatio } from "./media/Media";

function getAnimationName(direction: Direction, id: string) {
    switch (direction) {
        case "left":
            return "c-l-" + id;
        case "right":
            return "c-r-" + id;
        case "up":
            return "c-u-" + id;
        case "down":
            return "c-d-" + id;
    }
}

const CarouselWrapper = styled.div`
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

type CarouselSliderProps = {
    $speed: number;
    $length: number;
    $direction: Direction;
    $id: string;
};

const CarouselSlider = styled.div<CarouselSliderProps>`
    display: flex;
    flex-direction: ${(props) =>
        isHorizontal(props.$direction) ? "row" : "column"};
    animation: ${(props) => getAnimationName(props.$direction, props.$id)}
        ${(props) => props.$speed}s linear infinite;

    > * {
        flex-shrink: 0;
    }

    @keyframes ${(props) => "c-l-" + props.$id} {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-${(props) => props.$length}px);
        }
    }

    @keyframes ${(props) => "c-r-" + props.$id} {
        0% {
            transform: translateX(-${(props) => props.$length}px);
        }

        100% {
            transform: translateX(0);
        }
    }

    @keyframes ${(props) => "c-u-" + props.$id} {
        0% {
            transform: translateY(0);
        }

        100% {
            transform: translateY(-${(props) => props.$length}px);
        }
    }

    @keyframes ${(props) => "c-d-" + props.$id} {
        0% {
            transform: translateY(-${(props) => props.$length}px);
        }

        100% {
            transform: translateY(0);
        }
    }
`;

const CarouselItem = styled.div<{ $gap: number }>`
    margin-right: ${(props) => props.$gap}px;
`;

type CarouselProps = {
    child: React.ReactNode;
    childLength: number;
    gap: number;
    speed: number;
    direction: Direction;
};

export default function Carousel({
    child,
    childLength,
    gap,
    speed,
    direction,
}: CarouselProps) {
    const id = useSafeId();
    const [ref, size] = useSize<HTMLDivElement>();
    const trueChildLength = childLength + gap;

    var length = isHorizontal(direction) ? size.width : size.height;
    var quantity = Math.ceil(length / trueChildLength) + 1;

    if (isNaN(quantity) || quantity === Infinity) {
        quantity = 0;
    }

    return (
        <CarouselWrapper ref={ref}>
            <CarouselSlider
                $id={id}
                $length={trueChildLength}
                $direction={direction}
                $speed={trueChildLength / speed}
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

type ImageBlockWrapperProps = {
    $length: number;
    $size: number;
    $gap: number;
    $direction: Direction;
};

const ImageBlockWrapper = styled.div<ImageBlockWrapperProps>`
    display: flex;
    gap: ${(props) => props.$gap}px;

    ${(props) => {
        if (isHorizontal(props.$direction)) {
            return css`
                width: ${props.$length}px;
            `;
        } else {
            return css`
                height: ${props.$length}px;
            `;
        }
    }}

    flex-direction: ${(props) =>
        isHorizontal(props.$direction) ? "row" : "column"};

    > div {
        flex-shrink: 0;
        flex-grow: 0;

        ${(props) => {
            if (isHorizontal(props.$direction)) {
                return css`
                    height: ${props.$size}px;
                `;
            } else {
                return css`
                    width: ${props.$size}px;
                `;
            }
        }}
    }
`;

type ImageBlockProps = {
    images: Asset[];
    length: number;
    height: number;
    aspectRatio: AspectRatio;
    gap: number;
    direction: Direction;
};

function ImageBlock({
    images,
    length,
    height,
    aspectRatio,
    gap,
    direction,
}: ImageBlockProps) {
    return (
        <ImageBlockWrapper
            $length={length}
            $size={height}
            $gap={gap}
            $direction={direction}
        >
            {images.map((image, i) => (
                <div key={i}>
                    <Media
                        src={image}
                        aspectRatio={aspectRatio}
                        videoPlaying={false}
                        resizeMode="height"
                    />
                </div>
            ))}
        </ImageBlockWrapper>
    );
}

const ImageCarouselWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

type ImageCarouselProps = {
    images: Asset[];
    gap?: number;
    speed?: number;
    aspectRatio?: AspectRatio;
    direction?: Direction;
};

export function ImageCarousel({
    images,
    gap = 10,
    speed = 50,
    aspectRatio = "original",
    direction = "left",
}: ImageCarouselProps) {
    const [ref, size] = useSize<HTMLDivElement>();
    const height = isHorizontal(direction) ? size.height : size.width;

    var childLength = gap * images.length;

    for (var i = 0; i < images.length; i++) {
        var imgSize = images[i].dimensions;
        var trueAspect =
            aspectRatio === "original"
                ? imgSize.width / imgSize.height
                : aspectRatio;

        if (isHorizontal(direction)) childLength += trueAspect * height;
        else childLength += 1 / (trueAspect / height);
    }

    return (
        <ImageCarouselWrapper ref={ref}>
            <Carousel
                child={
                    <ImageBlock
                        length={childLength}
                        height={height}
                        images={images}
                        gap={gap}
                        aspectRatio={aspectRatio}
                        direction={direction}
                    />
                }
                childLength={childLength}
                gap={0}
                speed={speed}
                direction={direction}
            />
        </ImageCarouselWrapper>
    );
}

type GalleryCarouselProps = {
    images: Asset[];
    targetHeight: number;
    speed?: number;
    gap?: number;
    columnWidth?: number;
    onClick?: (src: string) => void;
    direction?: HorizontalDirection;
};

export function GalleryCarousel({
    images,
    targetHeight,
    speed = 100,
    gap = 8,
    columnWidth = 300,
    onClick,
    direction = "left",
}: GalleryCarouselProps) {
    const [columns, setColumns] = useState(1);
    const size = columns * (columnWidth + gap) - gap;

    return (
        <>
            <Carousel
                child={
                    <HorizontalGallery
                        images={images}
                        targetHeight={targetHeight}
                        gap={gap}
                        columnWidth={columnWidth}
                        onClick={onClick}
                        setColumns={setColumns}
                        videoPlaying={false}
                    />
                }
                childLength={size}
                gap={gap}
                speed={speed}
                direction={direction}
            />
        </>
    );
}

type DynamicGalleryCarouselProps = {
    images: Asset[];
    targetHeight: number;
    speed?: number;
    gapLarge?: number;
    gapSmall?: number;
    columnWidthLarge?: number;
    columnWidthSmall?: number;
    breakpoint?: number;
    onClick?: (src: string) => void;
    direction?: HorizontalDirection;
};

export function DynamicGalleryCarousel({
    images,
    targetHeight,
    speed = 100,
    gapLarge = 8,
    gapSmall = 6,
    columnWidthLarge = 300,
    columnWidthSmall = 200,
    breakpoint = 800,
    onClick,
    direction = "left",
}: DynamicGalleryCarouselProps) {
    const size = useWindowSize();
    const large = size.width > breakpoint;

    return (
        <GalleryCarousel
            images={images}
            targetHeight={targetHeight}
            speed={speed}
            gap={large ? gapLarge : gapSmall}
            columnWidth={large ? columnWidthLarge : columnWidthSmall}
            onClick={onClick}
            direction={direction}
        />
    );
}
