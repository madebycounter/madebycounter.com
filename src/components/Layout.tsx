import React from "react";
import styled from "styled-components";

interface LayoutAboutProps {
    children: React.ReactNode;
}

const LayoutAboutWrapper = styled.div`
    overflow: hidden;

    > div {
        margin: 0 auto;
        padding: 0 1rem;
        width: calc(100% - 2rem);
        max-width: 800px;
    }
`;

export function LayoutAbout({ children }: LayoutAboutProps) {
    return (
        <LayoutAboutWrapper>
            <div>{children}</div>
        </LayoutAboutWrapper>
    );
}

export const Layout = styled.div`
    margin: 0 auto;
    padding: 0 120px;

    @media (max-width: 1200px) {
        padding: 0 1rem;
        width: calc(100% - 2rem);
        max-width: 900px;
    }
`;

export const LayoutNarrow = styled.div`
    margin: 0 auto;
    padding: 0 1rem;
    width: calc(100% - 2rem);
    max-width: 900px;
`;

export const Column12 = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(12, [col-start] 1fr);
    gap: 20px;
`;

export const Column6 = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(6, [col-start] 1fr);
    gap: 20px;
`;

export const Column4 = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(4, [col-start] 1fr);
    gap: 20px;
`;

export const Column1 = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(1, [col-start] 1fr);
    gap: 20px;
`;
