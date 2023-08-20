import { Link } from "gatsby";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { DarkTheme } from "../global/themes";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Jumbotron from "../components/about/Jumbotron";

const StyledSplash = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
        margin: var(--gap);
        padding-bottom: 10rem;
        font-size: min(12vw, 12rem);
        line-height: 0.9em;
        letter-spacing: -0.04em;
        text-align: center;
    }

    a {
        position: absolute;
        bottom: 4rem;
        font-size: min(2rem, 8vw);
        color: ${({ theme }) => theme.color};
    }
`;

StyledSplash.defaultProps = {
    theme: DarkTheme,
};

const Error404 = () => {
    return (
        <ThemeProvider theme={DarkTheme}>
            <GlobalStyle />

            <Jumbotron>
                <Navbar active="" />

                <StyledSplash>
                    <h1>thanks! we'll be in touch soon.</h1>

                    <Link to="/">← go back</Link>
                </StyledSplash>
            </Jumbotron>
        </ThemeProvider>
    );
};

export default Error404;

export const Head = () => <Header title="Page Not Found" description="" />;
