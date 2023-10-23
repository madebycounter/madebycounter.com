import React, { useEffect } from "react";
import styled, { css } from "styled-components";

import useSize from "../global/useSize";

import Asset from "../types/Asset";
import Carousel from "./Carousel";
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
                    grid-template-areas: "media label";
                `;
            case "right":
                return css`
                    grid-template-columns: auto 1fr;
                    grid-template-areas: "label media";
                `;
            case "left-fill":
                return css`
                    grid-template-columns: 1fr auto;
                    grid-template-areas: "media label";
                `;
            case "right-fill":
                return css`
                    grid-template-columns: 1fr auto auto;
                    grid-template-areas: "empty label";
                `;
        }
    }}
`;

const LabelContainer = styled.div`
    position: relative;
`;

const Empty = styled.div<{ $inverted: boolean }>`
    width: 100%;
    height: 100%;
    grid-area: empty;

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
`;

const Label = styled(Heading2)<{ $inverted: boolean }>`
    font-size: inherit;
    text-decoration: none;
    white-space: nowrap;

    grid-area: label;

    padding: 0.1em;

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

const MediaContainer = styled.div<AcceptsButtonType>`
    width: 100%;
    overflow: hidden;
    display: flex;
    gap: 0.2em;
    height: 100%;

    grid-area: media;

    justify-content: ${(props) => {
        switch (props.$buttonType) {
            case "left":
                return "flex-end";
            case "right":
                return "flex-start";
        }
    }};
`;

type ArrowProps = { $inverted: boolean; $size: number };

const Arrow = styled.div<AcceptsButtonType & ArrowProps>`
    position: absolute;
    top: 0;
    height: ${(props) => props.$size}px;
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
            case "right" || "right-fill":
                return css`
                    clip-path: polygon(
                        -5% 0%,
                        0% 0%,
                        100% 50%,
                        0% 100%,
                        -5% 100%
                    );
                `;
            case "left" || "left-fill":
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
            case "right" || "right-fill":
                return css`
                    left: 100%;
                `;
            case "left" || "left-fill":
                return css`
                    right: 100%;
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
            <Empty $inverted={inverted} />

            <LabelContainer>
                <Label ref={ref} $inverted={inverted}>
                    {children}
                </Label>
                <Arrow
                    $buttonType={type}
                    $inverted={inverted}
                    $size={size.height}
                />
            </LabelContainer>

            <MediaContainer $buttonType={type}>
                <Carousel
                    images={images}
                    aspectRatio={1}
                    size={size.height}
                    gap={5}
                />
            </MediaContainer>
        </ButtonWrapper>
    );
}
