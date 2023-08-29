import { Link, graphql } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import { ThemedProps } from "../global/themes";

import { Direction } from "../types";
import Asset from "../types/Asset";
import Media from "./media/Media";

type DirectionProps = ThemedProps & {
    direction: Direction.Left | Direction.Right;
};

const ButtonArrowStyled = styled.svg<DirectionProps>`
    fill: ${(props: ThemedProps) => props.theme.color};
    position: absolute;
    z-index: 5;

    ${(props) =>
        props.direction == Direction.Right &&
        css`
            right: -20px;
        `};

    ${(props) =>
        props.direction == Direction.Left &&
        css`
            left: -20px;
        `};
`;

type ButtonArrowProps = {
    direction: Direction.Left | Direction.Right;
};

function ButtonArrow(props: ButtonArrowProps) {
    return (
        <ButtonArrowStyled direction={props.direction} height="50" width="20">
            {props.direction == Direction.Right && (
                <polygon points="0,0 20,25 0,50" />
            )}
            {props.direction == Direction.Left && (
                <polygon points="20,0 0,25 20,50" />
            )}
        </ButtonArrowStyled>
    );
}

const ButtonLabelStyled = styled(Link)<DirectionProps>`
    font-family: ${(props) => props.theme.fonts.heading};
    color: ${(props) => props.theme.backgroundColor};
    background-color: ${(props) => props.theme.color};

    font-size: 2.5rem;
    letter-spacing: -0.04em;
    text-decoration: none;
    text-align: right;

    position: relative;
    height: 50px;
    line-height: 50px;
    padding: 0 0.5rem;

    ${(props) =>
        props.direction == Direction.Left &&
        css`
            order: 1;
        `};
`;

export type ButtonLabelProps = {
    children: React.ReactNode;
    to: string;
    direction: Direction.Left | Direction.Right;
};

export function ButtonLabel(props: ButtonLabelProps) {
    return (
        <ButtonLabelStyled direction={props.direction} to={props.to}>
            {props.children}
            <ButtonArrow direction={props.direction} />
        </ButtonLabelStyled>
    );
}

const ButtonStyled = styled.div<DirectionProps>`
    position: relative;

    display: grid;

    ${(props) =>
        props.direction == Direction.Left &&
        css`
            grid-template-columns: 1fr auto;
        `};

    ${(props) =>
        props.direction == Direction.Right &&
        css`
            grid-template-columns: auto 1fr;
        `};
`;

export type ButtonProps = {
    children: React.ReactNode;
    to: string;
    direction: Direction.Left | Direction.Right;
    images: Asset[];
};

export function Button(props: ButtonProps) {
    return (
        <ButtonStyled direction={props.direction}>
            <ButtonLabel direction={props.direction} to={props.to}>
                {props.children}
            </ButtonLabel>

            <MediaCarousel images={props.images} gap={10} />
        </ButtonStyled>
    );
}

const MediaCarouselStyled = styled.div<ThemedProps>`
    background-color: red;
    position: relative;
    overflow: hidden;
    min-width: 50px;
`;

type MediaDivProps = ThemedProps & {
    start: number;
    speed: number;
    delay: number;
    divSize: number;
    index: number;
};

const MediaDivStyled = styled.div<MediaDivProps>`
    display: flex;
    position: absolute;
    gap: 10px;

    @keyframes scroll-${(props) => props.index} {
        0% {
            transform: translateX(${(props) => props.start}px);
        }
        100% {
            transform: translateX(-${(props) => props.divSize}px);
        }
    }

    animation: scroll-${(props) => props.index} ${(props) => props.speed}s linear
        infinite;
    animation-delay: -${(props) => props.delay}s;
`;

const MediaStyled = styled.div<ThemedProps>`
    width: 50px;
`;

type MediaCarouselProps = {
    images: Asset[];
    gap: number;
};

export function MediaCarousel(props: MediaCarouselProps) {
    const ref = useRef<HTMLDivElement>(null);
    const imageWidth = 50;
    const imageSpeed = 80;

    const [width, setWidth] = useState(0);
    // const [width] = useDebounce(rawWidth, 1, {
    //     maxWait: 100,
    // });

    const [animState, setAnimState] = useState({
        divSize: 0,
        divsNeeded: 0,
        start: 0,
        speed: 0,
        delay: 0,
    });

    useEffect((): (() => void) => {
        const observer = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width);
        });

        observer.observe(ref.current as HTMLDivElement);

        return () => ref.current && observer.unobserve(ref.current);
    }, [ref]);

    useEffect(() => {
        var divSize = (imageWidth + props.gap) * props.images.length;
        var divsNeeded = Math.ceil(width / divSize) + 1;
        var start = (divsNeeded - 1) * divSize;
        var speed = (divsNeeded * divSize) / imageSpeed;
        var delay = divSize / imageSpeed;

        setAnimState({
            divSize,
            divsNeeded,
            start,
            speed,
            delay,
        });
    }, [width]);

    return (
        <MediaCarouselStyled ref={ref}>
            {Array.from({ length: animState.divsNeeded }, (_, i) => (
                <MediaDivStyled
                    key={i}
                    start={animState.start}
                    speed={animState.speed}
                    delay={i * animState.delay}
                    divSize={animState.divSize}
                    index={i}
                >
                    {props.images.map((image, j) => {
                        return (
                            <MediaStyled key={j}>
                                <Media src={image} aspectRatio={1} />
                            </MediaStyled>
                        );
                    })}
                </MediaDivStyled>
            ))}
            <div></div>
        </MediaCarouselStyled>
    );
}

export const query = graphql`
    fragment ButtonMedia on ContentfulAsset {
        contentful_id
        title
        description
        publicUrl
        gatsbyImageData(
            aspectRatio: 1
            height: 50
            width: 50
            resizingBehavior: THUMB
        )
        __typename
        mimeType
    }
`;
