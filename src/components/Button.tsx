import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

import { HorizontalDirection } from "../types";
import LinkDiv from "./cards/utils/LinkDiv";

type ButtonProps = {
    children: React.ReactNode;
    to: string;
    direction?: HorizontalDirection;
    className?: string;
};

type StyledButtonProps = {
    $direction: HorizontalDirection;
};

const StyledButton = styled(LinkDiv)<StyledButtonProps>`
    font-size: 2rem;
    height: 1.5em;

    display: flex;
    align-items: stretch;
`;

const StyledButtonText = styled.span`
    font-size: inherit;
    text-decoration: none;
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: 400;
    padding: 0 0.3em;

    color: ${(props) => props.theme.backgroundColor};
    background-color: ${(props) => props.theme.color};
`;

const Arrow = styled.div`
    background-color: ${(props) => props.theme.color};
    clip-path: polygon(0% 0%, 0% 100%, 100% 50%);
    width: calc(1.5em * 0.4);
`;

export default function Button({
    children,
    to,
    className,
    direction = "right",
}: ButtonProps) {
    return (
        <StyledButton $direction={direction} to={to} className={className}>
            <StyledButtonText>{children}</StyledButtonText>

            <Arrow />
        </StyledButton>
    );
}
