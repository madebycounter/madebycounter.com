import React, { useEffect } from "react";
import styled, { css } from "styled-components";

import { Direction } from "../types";
import Asset from "../types/Asset";
import Media from "./media/Media";

function directionToTranslate(direction: Direction, offset: number) {
    switch (direction) {
        case "up":
            return `translateY(${offset}px)`;
        case "down":
            return `translateY(${offset}px)`;
        case "left":
            return `translateX(${offset}px)`;
        case "right":
            return `translateX(${offset}px)`;
    }
}

function isReversed(direction: Direction) {
    switch (direction) {
        case "up":
            return true;
        case "down":
            return false;
        case "left":
            return true;
        case "right":
            return false;
    }
}

function isHorizontal(direction: Direction) {
    switch (direction) {
        case "up":
            return false;
        case "down":
            return false;
        case "left":
            return true;
        case "right":
            return true;
    }
}

function directionToFlex(direction: Direction) {
    switch (direction) {
        case "up":
            return "column";
        case "down":
            return "column";
        case "left":
            return "row";
        case "right":
            return "row";
    }
}

interface ICarouselBlock {
    $gap: number;
    $direction: Direction;
}

const CarouselBlock = styled.div<ICarouselBlock>`
    display: flex;
    gap: ${(props) => props.$gap}px;
    flex-direction: ${(props) =>
        isHorizontal(props.$direction) ? "row" : "column"};

    ${(props) =>
        isHorizontal(props.$direction)
            ? css`
                  height: 100%;
              `
            : css`
                  width: 100%;
              `}

    /* Media object */
    > div {
        flex: 1 0 auto;
    }
`;

interface ICarouselWrapper {
    $direction: Direction;
}

const CarouselWrapper = styled.div<ICarouselWrapper>`
    overflow: hidden;

    height: 100%;
    width: 100%;
`;

interface ICarouselArticle {
    $gap: number;
    $direction: Direction;
    $speed: number;
    $size: number;
    $id: string;
}

const CarouselArticle = styled.div<ICarouselArticle>`
    display: flex;
    flex-direction: ${(props) =>
        isHorizontal(props.$direction) ? "row" : "column"};
    gap: ${(props) => props.$gap}px;

    ${(props) =>
        isHorizontal(props.$direction)
            ? css`
                  height: 100%;
              `
            : css`
                  width: 100%;
              `}

    animation: ${(props) =>
        `${
            isHorizontal(props.$direction) ? "moveHorizontal" : "moveVertical"
        }${CSS.escape(props.$id)}`}
        ${(props) => props.$size / props.$speed}s linear infinite
        ${(props) => (isReversed(props.$direction) ? "" : "reverse")};

    @keyframes moveHorizontal${(props) => CSS.escape(props.$id)} {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-${(props) => props.$size}px);
        }
    }

    @keyframes moveVertical${(props) => CSS.escape(props.$id)} {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-${(props) => props.$size}px);
        }
    }
`;

type CarouselProps = {
    images: Asset[];
    direction?: Direction;
    gap?: number;
    speed?: number;
};

export default function Carousel({
    images,
    direction = "down",
    gap = 10,
    speed = 100,
}: CarouselProps) {
    const identifier = React.useId();
    const blockRef = React.useRef<HTMLDivElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [currentSize, setCurrentSize] = React.useState<number>(0);

    function updateSize() {
        if (isHorizontal(direction)) {
            setCurrentSize((blockRef.current?.offsetWidth || 0) + gap);
        } else {
            setCurrentSize((blockRef.current?.offsetHeight || 0) + gap);
        }
    }

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            updateSize();
        });

        observer.observe(blockRef.current as HTMLDivElement);

        return () => {
            blockRef.current && observer.unobserve(blockRef.current);
        };
    }, []);

    useEffect(updateSize, [blockRef.current]);

    return (
        <CarouselWrapper $direction={direction} ref={wrapperRef}>
            <CarouselArticle
                $gap={gap}
                $direction={direction}
                $speed={speed}
                $size={currentSize}
                $id={identifier}
            >
                <CarouselBlock $gap={gap} $direction={direction} ref={blockRef}>
                    {images.map((image) => (
                        <Media src={image} />
                    ))}
                </CarouselBlock>
                <CarouselBlock $gap={gap} $direction={direction}>
                    {images.map((image) => (
                        <Media src={image} />
                    ))}
                </CarouselBlock>
            </CarouselArticle>
        </CarouselWrapper>
    );
}
