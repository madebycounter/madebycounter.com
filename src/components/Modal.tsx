import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { LightTheme } from "../global/themes";

import { Heading1, Paragraph } from "./Typography";

type ModalWrapperProps = { $open: boolean };

const ModalWrapper = styled.div<ModalWrapperProps>`
    display: ${(props) => (props.$open ? "flex" : "none")};
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000000aa;
    top: 0;
    left: 0;
    z-index: 9999;

    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    min-width: 400px;
    padding: 1rem;
    box-sizing: border-box;
`;

type ModalProps = {
    children: React.ReactNode;
    open: boolean;
};

export default function Modal({ children, open }: ModalProps) {
    return (
        <ModalWrapper $open={open}>
            <ThemeProvider theme={LightTheme}>
                <ModalContent>{children}</ModalContent>
            </ThemeProvider>
        </ModalWrapper>
    );
}
