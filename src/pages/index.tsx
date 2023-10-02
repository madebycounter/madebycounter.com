import React, { useRef } from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { DarkTheme } from "../global/themes";

import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Pitch from "../components/about/Pitch";
import Segment from "../components/about/Segment";

import { HorizontalDirection } from "../types";
import { usePortfolioItems } from "../types/PortfolioItem";
import { useAboutPage } from "../types/pages/AboutPage";

const PitchButton = styled(Button)`
    font-size: 4rem;
`;

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
                <Segment>
                    <Pitch
                        portfolioItems={portfolioItems.slice(0, 2)}
                        affirmation={
                            <>
                                We make
                                <br />
                                business
                                <br />
                                happen.
                            </>
                        }
                        button={<PitchButton to="#">Learn More</PitchButton>}
                    />
                </Segment>

                <Segment direction="left">
                    <Pitch
                        direction="left"
                        portfolioItems={portfolioItems.slice(4, 6)}
                        affirmation={
                            <>
                                Our pics
                                <br />
                                increase
                                <br />
                                sales.
                            </>
                        }
                        button={
                            <PitchButton to="#" direction="left">
                                Learn More
                            </PitchButton>
                        }
                    />
                </Segment>

                <Segment>
                    <Pitch
                        portfolioItems={portfolioItems.slice(6, 8)}
                        affirmation={
                            <>
                                Drones
                                <br />
                                make you
                                <br />
                                stand out.
                            </>
                        }
                        button={<PitchButton to="#">Learn More</PitchButton>}
                    />
                </Segment>
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
