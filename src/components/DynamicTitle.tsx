import React from "react";
import styled from "styled-components";

type DynamicTextProps = {
    children: React.ReactNode;
    size: number;
    lineHeight?: number;
    letterSpacing?: number;
};

type StyledHeadingProps = {
    size: number;
    lineHeight: number;
    letterSpacing: number;
};

const StyledHeading = styled.h1<StyledHeadingProps>`
    color: inherit;
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${({ size }) => size}vw;
    line-height: ${({ lineHeight }) => lineHeight}vw;
    letter-spacing: ${({ letterSpacing }) => letterSpacing}vw;
`;

const DynamicTitle: React.FC<DynamicTextProps> = ({
    children,
    size,
    lineHeight = 0.9,
    letterSpacing = -0.04,
}) => {
    return (
        <StyledHeading
            size={size}
            lineHeight={size * lineHeight}
            letterSpacing={size * letterSpacing}
        >
            {children}
        </StyledHeading>
    );
};

export default DynamicTitle;
