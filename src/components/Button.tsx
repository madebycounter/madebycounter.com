import React, { useState } from "react";
import styled, { css } from "styled-components";

import { randomTeamColor } from "../global/colorTools";

import { HorizontalDirection } from "../types";
import { Heading2 } from "./Typography";
import LinkDiv from "./cards/utils/LinkDiv";

const MediaPlaceholderWrapper = styled.div<{ $color: string | undefined }>`
    height: 100%;
    aspect-ratio: 1;
    background-color: ${(props) => props.$color};
`;

function MediaPlaceholder() {
    const [color, _] = useState(randomTeamColor(2));

    return <MediaPlaceholderWrapper $color={color} />;
}

type AcceptsDirection = {
    $direction: HorizontalDirection;
};

export const ButtonWrapper = styled(LinkDiv)<AcceptsDirection>`
    font-size: 2rem;
    height: 1.5em;
    display: flex;
    align-items: stretch;
    width: 100%;

    flex-direction: ${(props) => {
        switch (props.$direction) {
            case "left":
                return "row-reverse";
            case "right":
                return "row";
        }
    }};
`;

const Label = styled(Heading2)`
    position: relative;
    font-size: inherit;
    text-decoration: none;
    padding: 0 0.4em;
    padding-top: 0.25em;
    white-space: nowrap;

    color: ${(props) => props.theme.backgroundColor};
    background-color: ${(props) => props.theme.color};
`;

const MediaContainer = styled.div<AcceptsDirection>`
    width: 100%;
    overflow: hidden;
    display: flex;
    gap: 0.2em;
    height: 100%;

    justify-content: ${(props) => {
        switch (props.$direction) {
            case "left":
                return "flex-end";
            case "right":
                return "flex-start";
        }
    }};
`;

const Arrow = styled.div<AcceptsDirection>`
    position: absolute;
    top: 0;
    background-color: ${(props) => props.theme.color};
    width: calc(1.5em * 0.4);
    height: 100%;

    ${(props) => {
        switch (props.$direction) {
            case "right":
                return css`
                    left: 100%;
                    clip-path: polygon(
                        -5% 0%,
                        0% 0%,
                        100% 50%,
                        0% 100%,
                        -5% 100%
                    );
                `;
            case "left":
                return css`
                    right: 100%;
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
`;

type ButtonProps = {
    children: React.ReactNode;
    to: string;
    direction?: HorizontalDirection;
    className?: string;
};

export default function ButtonRight({
    children,
    to,
    className,
    direction = "right",
}: ButtonProps) {
    return (
        <ButtonWrapper $direction={direction} to={to} className={className}>
            <Label>
                {children}
                <Arrow $direction={direction} />
            </Label>

            <MediaContainer $direction={direction}>
                <MediaPlaceholder />
                {/* <MediaPlaceholder />
                <MediaPlaceholder />
                <MediaPlaceholder />
                <MediaPlaceholder />
                <MediaPlaceholder /> */}
            </MediaContainer>
        </ButtonWrapper>
    );
}
