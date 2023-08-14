import { Link } from "gatsby";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { DarkTheme } from "../global/themes";

import Header from "../components/Header";
import Navbar from "../components/Navbar";

const StyledSplash = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
        padding-bottom: 10rem;
        font-size: 12vw;
    }

    a {
        position: absolute;
        bottom: 4rem;
        font-size: min(2rem, 8vw);
        color: ${({ theme }) => theme.color};
    }
`;

export default function ErrorPage() {
    return (
        <ThemeProvider theme={DarkTheme}>
            <GlobalStyle />

            <Navbar active="about" />

            <StyledSplash>
                <h1>
                    error 404,
                    <br />
                    page not found
                </h1>

                <Link to="/">← go home</Link>
            </StyledSplash>
        </ThemeProvider>
    );
}

export const Head = () => <Header title="Page Not Found" description="" />;
