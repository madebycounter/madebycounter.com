import React, { MouseEvent } from "react";
import styled, { ThemeProvider, css } from "styled-components";

import { LightTheme } from "../global/themes";

const ModalBackground = styled.div`
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    padding: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #000000aa;

    > * {
        transform: scale(0.95);
        transition: transform 200ms ease-out;
    }
`;

const ModalWrapper = styled.div<{ $open: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;

    ${(props) =>
        props.$open
            ? css`
                  transition:
                      visibility 200ms ease-in-out,
                      opacity 100ms ease-in-out;
              `
            : css`
                  transition:
                      visibility 200ms ease-in-out 200ms,
                      opacity 100ms ease-in-out;
              `}

    visibility: hidden;
    opacity: 0;

    &.open {
        visibility: visible;
        opacity: 1;

        ${ModalBackground} > * {
            transform: scale(1);
        }
    }
`;

type ModalProps = {
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function Modal({ children, open, setOpen }: ModalProps) {
    return (
        <ThemeProvider theme={LightTheme}>
            <ModalWrapper $open={open} className={open ? "open" : ""}>
                <ModalBackground
                    onClick={(e: MouseEvent) => {
                        if (e.target === e.currentTarget) setOpen(false);
                    }}
                >
                    {children}
                </ModalBackground>
            </ModalWrapper>
        </ThemeProvider>
    );
}
