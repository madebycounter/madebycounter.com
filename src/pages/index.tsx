import React, { useRef } from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { DarkTheme } from "../global/themes";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { LayoutNarrow } from "../components/Layout";
import { MobileSplit } from "../components/MobileSwap";
import Navbar from "../components/Navbar";
import Henry from "../components/about/Henry";
import { Hero } from "../components/about/Hero";
import Luke from "../components/about/Luke";
import { Nametag } from "../components/about/Typography";
import William from "../components/about/William";
import ContactForm from "../components/forms/ContactForm";
import { FormSplit } from "../components/forms/Forms";
import { useTeamMembers } from "../types/components/TeamMember";

import { useAboutPage } from "../types/pages/AboutPage";

const IndexPage = () => {
    const footerTrigger = useRef<HTMLDivElement>(null);

    const teamMembers = useTeamMembers();
    const {
        lukeShowcase,
        williamShowcase,
        henryShowcase,
        lukeSlideshows,
        williamSlideshows,
        henrySlideshows,
        lukeService,
        williamService,
        henryService,
        heroMedia,
    } = useAboutPage();

    return (
        <ThemeProvider theme={DarkTheme}>
            <GlobalStyle />

            <Navbar active={"about"} />

            <Hero media={heroMedia} />

            <div>
                <Luke
                    portfolioItems={lukeShowcase}
                    portrait={teamMembers.luke.fullBody}
                    signature={teamMembers.luke.signature}
                    slideshow1={lukeSlideshows[0]}
                    slideshow2={lukeSlideshows[1]}
                    buttonCarousel={lukeService.buttonImages.items}
                />

                <Henry
                    portfolioItems={henryShowcase}
                    portrait={teamMembers.henry.fullBody}
                    signature={teamMembers.henry.signature}
                    slideshow1={henrySlideshows[0]}
                    slideshow2={henrySlideshows[1]}
                    buttonCarousel={henryService.buttonImages.items}
                />

                <William
                    portfolioItems={williamShowcase}
                    portrait={teamMembers.william.fullBody}
                    signature={teamMembers.william.signature}
                    dronePortrait={teamMembers.william.fullBodyExtra}
                    slideshow1={williamSlideshows[0]}
                    slideshow2={williamSlideshows[1]}
                    buttonCarousel={williamService.buttonImages.items}
                />
            </div>

            <LayoutNarrow>
                <MobileSplit>
                    <div>
                        <Nametag>Pretty cool, right?</Nametag>
                    </div>

                    <ContactForm
                        formContext={{
                            pageUri: `madebycounter.com/`,
                            pageName: `Counter | About`,
                        }}
                    />
                </MobileSplit>
            </LayoutNarrow>

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
