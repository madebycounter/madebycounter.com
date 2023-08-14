import React from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { DarkTheme } from "../global/themes";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Hero from "../components/about/Hero";

export default function IndexPage() {
    return (
        <ThemeProvider theme={DarkTheme}>
            <GlobalStyle />

            <Navbar active="about" />

            <Hero />
        </ThemeProvider>
    );
}

export const Head = () => <Header title="About" description="" />;
