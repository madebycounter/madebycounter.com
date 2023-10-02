import React, { useRef } from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { DarkTheme } from "../global/themes";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Henry from "../components/about/Henry";
import Luke from "../components/about/Luke";
import William from "../components/about/William";

import { usePortfolioItems } from "../types/PortfolioItem";
import { useAboutPage } from "../types/pages/AboutPage";

const IndexPage = () => {
    const footerTrigger = useRef<HTMLDivElement>(null);
    const {
        lukeSlideshow1,
        lukeSlideshow2,
        henrySlideshow1,
        henrySlideshow2,
        williamSlideshow1,
        williamSlideshow2,
    } = useAboutPage();

    const portfolioItems = usePortfolioItems();

    return (
        <ThemeProvider theme={DarkTheme}>
            <GlobalStyle />
            <Navbar active={"about"} />

            <div>
                <Luke portfolioItems={portfolioItems.slice(0, 2)} />

                <Henry portfolioItems={portfolioItems.slice(6, 8)} />

                <William portfolioItems={portfolioItems.slice(8, 10)} />
            </div>

            <Footer />
        </ThemeProvider>
    );
};

export default IndexPage;

export const Head = () => (
    <Header
        location="/"
        title="About"
        description="Counter LLC is a media production company and creative agency based in San Jose, California offering a variety of services including videography, photography, graphic design, real estate, and web development."
    />
);
