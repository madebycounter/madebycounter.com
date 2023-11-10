import React, { useEffect } from "react";
import styled, { css } from "styled-components";

import useSize from "../global/useSize";

import Asset from "../types/Asset";
import { ImageCarousel } from "./Carousel";
import { Heading2 } from "./Typography";
import LinkDiv from "./cards/utils/LinkDiv";

export type ButtonType = "left" | "right" | "left-fill" | "right-fill";

type AcceptsButtonType = {
    $buttonType: ButtonType;
};

type ButtonWrapperProps = AcceptsButtonType & { $size: number };

export const ButtonWrapper = styled(LinkDiv)<ButtonWrapperProps>`
    font-size: 1em;
    display: grid;
    width: 100%;

    ${(props) => {
        switch (props.$buttonType) {
            case "left":
                return css`
                    grid-template-columns: 1fr auto;
                    grid-template-areas: "spacer label";
                `;
            case "right":
                return css`
                    grid-template-columns: auto 1fr;
                    grid-template-areas: "label spacer";
                `;
            case "left-fill":
                return css`
                    grid-template-columns: 1fr auto;
                    grid-template-areas: "label spacer";
                `;
            case "right-fill":
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

type LabelProps = AcceptsButtonType & { $inverted: boolean; $gap: number };

const Label = styled(Heading2)<LabelProps>`
    font-size: inherit;
    text-decoration: none;
    white-space: nowrap;

    grid-area: label;

    padding: 0.1em;

    ${(props) => {
        if (props.$buttonType === "left-fill") {
            return css`
                margin-left: ${props.$gap}px;
            `;
        } else if (props.$buttonType === "right-fill") {
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

const MediaContainer = styled.div<AcceptsButtonType & { $inverted: boolean }>`
    width: 100%;
    height: 100%;
    overflow: hidden;
    grid-area: spacer;

    ${(props) => {
        if (
            props.$buttonType === "left-fill" ||
            props.$buttonType === "right-fill"
        ) {
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
type ArrowProps = { $inverted: boolean; $size: number };

const Arrow = styled.div<AcceptsButtonType & ArrowProps>`
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
        switch (props.$buttonType) {
            case "right":
            case "right-fill":
                return css`
                    clip-path: polygon(
                        -5% 0%,
                        0% 0%,
                        100% 50%,
                        0% 100%,
                        -5% 100%
                    );
                `;
            case "left":
            case "left-fill":
                return css`
                    clip-path: polygon(
                        105% 0%,
                        100% 0%,
                        0% 50%,
                        100% 100%,
                        105% 100%
                    );
                `;
        }
    }}

    ${(props) => {
        switch (props.$buttonType) {
            case "right":
                return css`
                    left: 100%;
                `;
            case "left":
                return css`
                    right: 100%;
                `;
            case "right-fill":
                return css`
                    left: calc(100% - ${(props.$size * 16) / 46}px);
                `;
            case "left-fill":
                return css`
                    right: calc(100% - ${(props.$size * 16) / 46}px);
                `;
        }
    }}
`;

type ButtonProps = {
    children: React.ReactNode;
    to: string;
    type?: ButtonType;
    className?: string;
    images?: Asset[];
    inverted?: boolean;
};

export default function Button({
    children,
    to,
    className,
    type = "right",
    images = [],
    inverted = false,
}: ButtonProps) {
    const [ref, size] = useSize<HTMLHeadingElement>();

    return (
        <ButtonWrapper
            $buttonType={type}
            $size={size.height}
            to={to}
            className={className}
        >
            <LabelContainer>
                <Label
                    ref={ref}
                    $inverted={inverted}
                    $buttonType={type}
                    $gap={(size.height * 16) / 46}
                >
                    {children}
                </Label>
                <Arrow
                    $buttonType={type}
                    $inverted={inverted}
                    $size={size.height}
                />
            </LabelContainer>

            <MediaContainer $buttonType={type} $inverted={inverted}>
                {(type === "left" || type === "right") && (
                    <ImageCarousel
                        images={images}
                        aspectRatio={1}
                        size={size.height}
                        gap={size.height * 0.1}
                    />
                )}
            </MediaContainer>
        </ButtonWrapper>
    );
}
