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

    // boo!
    const {
        lukeSlideshow1,
        lukeSlideshow2,
        henrySlideshow1,
        henrySlideshow2,
        williamSlideshow1,
        williamSlideshow2,
        lukePortrait,
        henryPortrait,
        williamPortrait,
        dronePortrait,
        footerPortraits,
        williamShowcase,
        henryShowcase,
        lukeShowcase,
    } = useAboutPage();

    return (
        <ThemeProvider theme={DarkTheme}>
            <GlobalStyle />
            <Navbar active={"about"} />

            <div>
                <Luke portfolioItems={lukeShowcase} portrait={lukePortrait} />

                <Henry
                    portfolioItems={henryShowcase}
                    portrait={henryPortrait}
                />

                <William
                    portfolioItems={williamShowcase}
                    portrait={williamPortrait}
                    dronePortrait={dronePortrait}
                />
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
