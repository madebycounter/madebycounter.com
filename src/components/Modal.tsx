import React, { MouseEvent } from "react";
import styled, { ThemeProvider } from "styled-components";

import { LightTheme } from "../global/themes";

type ModalWrapperProps = { $open: boolean };

const ModalWrapper = styled.div<ModalWrapperProps>`
    display: ${(props) => (props.$open ? "flex" : "none")};
    position: fixed;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    background-color: #000000aa;
    top: 0;
    left: 0;
    z-index: 9999;
    padding: 1rem;

    justify-content: center;
    align-items: center;
`;

type ModalProps = {
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function Modal({ children, open, setOpen }: ModalProps) {
    return (
        <ThemeProvider theme={LightTheme}>
            <ModalWrapper
                $open={open}
                onClick={(e: MouseEvent) => {
                    if (e.target === e.currentTarget) setOpen(false);
                }}
            >
                {children}
            </ModalWrapper>
        </ThemeProvider>
    );
}
