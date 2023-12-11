import React, { useEffect } from "react";
import styled, { css } from "styled-components";

import useSize from "../global/useSize";

import Asset from "../types/Asset";
import { HorizontalDirection } from "../types/directions";
import { ImageCarousel } from "./Carousel";
import { Heading2 } from "./Typography";
import LinkDiv from "./cards/utils/LinkDiv";

export type ButtonType = "normal" | "carousel" | "fill";

type ButtonWrapperProps = {
    $buttonType: ButtonType;
    $direction: HorizontalDirection;
    $size: number;
};

export const ButtonWrapper = styled(LinkDiv)<ButtonWrapperProps>`
    display: grid;
    width: 100%;
    height: ${(props) => props.$size}px;

    ${(props) => {
        if (
            props.$buttonType === "normal" ||
            props.$buttonType === "carousel"
        ) {
            if (props.$direction === "left")
                return css`
                    grid-template-columns: 1fr auto;
                    grid-template-areas: "spacer label";
                `;
            if (props.$direction === "right")
                return css`
                    grid-template-columns: auto 1fr;
                    grid-template-areas: "label spacer";
                `;
        } else {
            if (props.$direction === "left")
                return css`
                    grid-template-columns: 1fr auto;
                    grid-template-areas: "label spacer";
                `;
            if (props.$direction === "right")
                return css`
                    grid-template-columns: 1fr auto;
                    grid-template-areas: "spacer label";
                `;
        }
    }}
`;

const LabelContainer = styled.div`
    position: relative;
`;

type LabelProps = {
    $buttonType: ButtonType;
    $direction: HorizontalDirection;
    $inverted: boolean;
    $gap: number;
};

const Label = styled(Heading2)<LabelProps>`
    text-decoration: none;
    white-space: nowrap;
    font-size: 100%;

    grid-area: label;

    padding: 0.15em;

    ${(props) => {
        if (props.$buttonType === "fill") {
            if (props.$direction === "left")
                return css`
                    margin-left: ${props.$gap}px;
                `;
            if (props.$direction === "right")
                return css`
                    margin-right: ${props.$gap}px;
                `;
        }
    }}

    ${(props) => {
        if (props.$inverted) {
            return css`
                color: ${(props) => props.theme.color};
                background-color: ${(props) => props.theme.backgroundColor};
            `;
        } else {
            return css`
                color: ${(props) => props.theme.backgroundColor};
                background-color: ${(props) => props.theme.color};
            `;
        }
    }}
`;

type MediaContainerProps = {
    $buttonType: ButtonType;
    $inverted: boolean;
};

const MediaContainer = styled.div<MediaContainerProps>`
    width: 100%;
    height: 100%;
    overflow: hidden;
    grid-area: spacer;

    ${(props) => {
        if (props.$buttonType === "fill") {
            if (props.$inverted) {
                return css`
                    background-color: ${(props) => props.theme.backgroundColor};
                `;
            } else {
                return css`
                    background-color: ${(props) => props.theme.color};
                `;
            }
        }
    }}
`;

// TODO: refactor to use arrow component from Arrow.tsx
type ArrowProps = {
    $buttonType: ButtonType;
    $direction: HorizontalDirection;
    $inverted: boolean;
    $size: number;
};

const Arrow = styled.div<ArrowProps>`
    position: absolute;
    top: 0;
    height: 100%;
    aspect-ratio: 16 / 46;
    z-index: 10;

    ${(props) => {
        if (props.$inverted) {
            return css`
                background-color: ${(props) => props.theme.backgroundColor};
            `;
        } else {
            return css`
                background-color: ${(props) => props.theme.color};
            `;
        }
    }}

    ${(props) => {
        switch (props.$direction) {
            case "right":
                return css`
                    clip-path: polygon(
                        -20% 0%,
                        0% 0%,
                        100% 50%,
                        0% 100%,
                        -20% 100%
                    );
                `;
            case "left":
                return css`
                    clip-path: polygon(
                        120% 0%,
                        100% 0%,
                        0% 50%,
                        100% 100%,
                        120% 100%
                    );
                `;
        }
    }}

    ${(props) => {
        if (
            props.$buttonType === "normal" ||
            props.$buttonType === "carousel"
        ) {
            if (props.$direction === "left")
                return css`
                    right: 100%;
                `;
            if (props.$direction === "right")
                return css`
                    left: 100%;
                `;
        } else {
            if (props.$direction === "left")
                return css`
                    right: calc(100% - ${(props.$size * 16) / 46}px);
                `;
            if (props.$direction === "right")
                return css`
                    left: calc(100% - ${(props.$size * 16) / 46}px);
                `;
        }
    }}
`;

type ButtonProps = {
    children: React.ReactNode;
    to?: string;
    onClick?: () => void;
    type?: ButtonType;
    direction?: HorizontalDirection;
    className?: string;
    images?: Asset[];
    inverted?: boolean;
};

export default function Button({
    children,
    to,
    onClick,
    className,
    type = "normal",
    direction = "right",
    images = [],
    inverted = false,
}: ButtonProps) {
    const [ref, size] = useSize<HTMLHeadingElement>();

    return (
        <ButtonWrapper
            $buttonType={type}
            $direction={direction}
            $size={size.height}
            to={to || ""}
            onClick={(e) => {
                if (!onClick) return;
                e.preventDefault();
                onClick();
            }}
            className={className}
        >
            <LabelContainer>
                <Label
                    ref={ref}
                    $buttonType={type}
                    $direction={direction}
                    $inverted={inverted}
                    $gap={(size.height * 16) / 46}
                >
                    {children}
                </Label>
                <Arrow
                    $buttonType={type}
                    $direction={direction}
                    $inverted={inverted}
                    $size={size.height}
                />
            </LabelContainer>

            <MediaContainer $buttonType={type} $inverted={inverted}>
                {type === "carousel" && (
                    <ImageCarousel
                        images={images}
                        aspectRatio={1}
                        gap={size.height * 0.1}
                        direction={direction}
                    />
                )}
            </MediaContainer>
        </ButtonWrapper>
    );
}
