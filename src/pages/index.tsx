import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useRef } from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { DarkTheme } from "../global/themes";
import { SlideshowData } from "../global/types";

import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Highlight from "../components/Highlight";
import { LayoutAbout } from "../components/Layout";
import Navbar from "../components/Navbar";
import { DirectionReveal } from "../components/Revealer";
import Signature from "../components/Signature";
import Jumbotron from "../components/about/Jumbotron";
import Splash from "../components/about/Splash";
import {
    Description,
    TitlePrettyCool,
    Role,
    Title,
} from "../components/about/Typography";
import Slideshow from "../components/media/Slideshow";

const BaseMember = styled.div`
    position: relative;

    .show-desktop {
        display: inline;
    }

    .show-mobile {
        display: none;
    }

    @media (max-width: 864px) {
        .show-desktop {
            display: none;
        }

        .show-mobile {
            display: inline;
        }
    }

    .portrait,
    .drone {
        transition:
            opacity 400ms ease-in-out,
            transform 400ms cubic-bezier(0.66, 0.72, 0.56, 1.18);
    }
`;

const Luke = styled(BaseMember)`
    margin-top: 1rem;
    margin-bottom: 10rem;

    @media (max-width: 864px) {
        margin-bottom: 60vw;
    }

    .title {
        padding-top: var(--gap);
    }

    .portrait {
        position: absolute;
        top: 55px;
        right: 0;
        z-index: 100;
        width: 25.3%;

        @media (max-width: 864px) {
            top: calc(0.25 * var(--c100));
            width: 51%;
        }
    }

    .description {
        &.show-desktop {
            img {
                position: absolute;
                width: 22%;
                left: 425px;
                bottom: 210px;
            }
        }

        &.show-mobile {
            img {
                position: absolute;
                width: 26%;
                left: calc(0.29 * var(--c100));
                bottom: calc(0.66 * var(--c100));
            }
        }
    }

    .slideshows {
        display: flex;
        width: 80%;
        margin: 1.5rem 0;
        gap: 1rem;

        @media (max-width: 864px) {
            flex-direction: column;
            width: 55%;
            margin: calc(0.1 * var(--c100)) 0;
        }
    }
`;

const Henry = styled(BaseMember)`
    margin-bottom: 15rem;

    @media (max-width: 864px) {
        margin-bottom: 80vw;
    }

    .portrait {
        position: absolute;
        top: 100px;
        right: 0;
        z-index: 100;
        width: 35%;

        @media (max-width: 864px) {
            top: calc(-0.25 * var(--c100));
            width: 60%;
        }
    }

    @media (min-width: 864px) {
        .title {
            margin-bottom: 3rem;
        }
    }

    .description {
        img {
            margin-top: 1rem;
            width: 43%;
        }
    }

    .slideshows {
        position: absolute;
        width: 32%;

        bottom: 0px;
        right: 185px;

        > div {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            > div {
                width: 100%;
            }

            @media (max-width: 864px) {
                flex-direction: row-reverse;
                align-items: baseline;

                > .ssl {
                    flex: 55;
                }

                > .ssp {
                    flex: 45;
                }
            }
        }

        @media (max-width: 864px) {
            width: 100%;
            bottom: calc(-0.35 * var(--c100));
            left: 0;
        }
    }
`;

const William = styled(BaseMember)`
    .portrait {
        position: absolute;
        top: 110px;
        right: 0;
        z-index: 100;
        width: 29%;

        @media (max-width: 864px) {
            top: calc(-0.04 * var(--c100));
            width: 45%;
        }
    }

    .drone {
        position: absolute;
        top: -110px;
        right: 78px;
        width: 29%;

        @media (max-width: 864px) {
            width: 40%;
            top: calc(-0.3 * var(--c100));
            right: calc(0.11 * var(--c100));
        }
    }

    .description {
        &.show-desktop {
            img {
                position: absolute;
                width: 21%;
                bottom: 208px;
                right: 168px;
            }
        }

        &.show-mobile {
            img {
                position: absolute;
                width: 30%;
                bottom: calc(0.31 * var(--c100));
                right: calc(0.26 * var(--c100));
            }
        }
    }

    .slideshows {
        display: flex;
        width: 83%;
        margin: 5rem 0;
        gap: 1rem;

        @media (max-width: 864px) {
            width: 100%;
            margin: calc(0.1 * var(--c100)) 0;
        }
    }

    margin-bottom: 12rem;

    @media (max-width: 864px) {
        margin-bottom: 30vw;
    }

    @media (min-width: 864px) {
        .title {
            margin-bottom: 2rem;
        }
    }
`;

const PrettyCoolRight = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;

    @media (max-width: 864px) {
        flex-direction: column;
        gap: 0;
    }

    .rightBox {
        margin-top: 1rem;
    }
`;

const TeamFooter = styled.div`
    position: relative;
    overflow: hidden;
    height: 24rem;

    @media (max-width: 864px) {
        height: calc(0.5 * var(--c100));
    }

    .portrait {
        position: absolute;
        transition:
            opacity 400ms ease-in-out,
            transform 400ms cubic-bezier(0.66, 0.72, 0.56, 1.18);

        &.william {
            --width: 30%;
            --offset: 5%;

            width: var(--width);
            left: calc(((100% - var(--width)) / 2) + var(--offset));
            top: 50px;
            z-index: 1;

            @media (max-width: 864px) {
                top: calc(0.07 * var(--c100));
                --width: 35%;
                --offset: 3%;
            }
        }

        &.henry {
            --width: 30%;
            --offset: 28%;

            width: var(--width);
            left: calc(((100% - var(--width)) / 2) + var(--offset));
            top: 70px;
            z-index: 0;

            @media (max-width: 864px) {
                top: calc(0.09 * var(--c100));
                --width: 35%;
                --offset: 31%;
            }
        }

        &.luke {
            --width: 43%;
            --offset: -17%;

            width: var(--width);
            left: calc(((100% - var(--width)) / 2) + var(--offset));
            top: 0;
            z-index: 0;

            @media (max-width: 864px) {
                --width: 48%;
                --offset: -22%;
            }
        }
    }
`;

const IndexPage = () => {
    const footerTrigger = useRef<HTMLDivElement>(null);
    const slideshowData: {
        luke1: SlideshowData;
        luke2: SlideshowData;
        henry1: SlideshowData;
        henry2: SlideshowData;
        william1: SlideshowData;
        william2: SlideshowData;
    } = useStaticQuery(graphql`
        {
            luke1: contentfulSlideshow(slug: { eq: "about-luke-1" }) {
                ...Slideshow
            }
            luke2: contentfulSlideshow(slug: { eq: "about-luke-2" }) {
                ...Slideshow
            }
            henry1: contentfulSlideshow(slug: { eq: "about-henry-1" }) {
                ...Slideshow
            }
            henry2: contentfulSlideshow(slug: { eq: "about-henry-2" }) {
                ...Slideshow
            }
            william1: contentfulSlideshow(slug: { eq: "about-william-1" }) {
                ...Slideshow
            }
            william2: contentfulSlideshow(slug: { eq: "about-william-2" }) {
                ...Slideshow
            }
        }
    `);

    const { luke1, luke2, henry1, henry2, william1, william2 } = slideshowData;

    return (
        <ThemeProvider theme={DarkTheme}>
            <GlobalStyle />

            <Jumbotron>
                <Navbar active={"about"} />
                <Splash />
            </Jumbotron>

            <LayoutAbout>
                <div id="content" />

                <Luke>
                    <Title className="title">
                        luke&nbsp;
                        <Role className="role">[videographer]</Role>
                        <br />
                        a. makinson
                    </Title>

                    <Description className="description show-desktop">
                        Hey, Luke here! Look, I like making
                        <br />
                        cool stuff just like you. Let's show off
                        <br />
                        your brand with the quality
                        <br />
                        video it deserves.
                        <Signature name="Luke" />
                    </Description>

                    <Description className="description show-mobile">
                        Hey, Luke here! Look,
                        <br />
                        I like making cool
                        <br />
                        stuff just like you.
                        <br />
                        Let's show off your
                        <br />
                        brand with the
                        <br />
                        quality video it
                        <br />
                        deserves.
                        <Signature name="Luke" />
                    </Description>

                    <DirectionReveal
                        offsetX={150}
                        offsetY={0}
                        className="portrait"
                        scrollOffset={50}
                    >
                        <StaticImage
                            src="../images/about/luke.png"
                            placeholder="none"
                            alt=""
                        />
                    </DirectionReveal>

                    <div className="slideshows">
                        <Slideshow src={luke1} aspectRatio={16 / 9} />

                        <Slideshow src={luke2} aspectRatio={16 / 9} />
                    </div>
                </Luke>

                <Henry>
                    <Title className="title">
                        henry&nbsp;
                        <Role className="role show-desktop">
                            [photographer]
                        </Role>
                        <br />
                        j. buck
                        <Role className="role show-mobile">
                            <br />
                            [photographer]
                        </Role>
                    </Title>

                    <Description className="description">
                        Hi, I'm Henry! Your
                        <br />
                        hard work deserves
                        <br />
                        a strong social media
                        <br />
                        presence. Let's build
                        <br />
                        your following with
                        <br />
                        quality photography
                        <br />
                        and graphic design.
                        <br />
                        <Signature className="signature" name="Henry" />
                    </Description>

                    <DirectionReveal
                        offsetX={150}
                        offsetY={0}
                        scrollOffset={50}
                        className="portrait"
                    >
                        <StaticImage
                            src="../images/about/henry.png"
                            placeholder="none"
                            alt=""
                        />
                    </DirectionReveal>

                    <div className="slideshows">
                        <div>
                            <div className="ssp">
                                <Slideshow src={henry2} aspectRatio={4 / 5} />
                            </div>

                            <div className="ssl">
                                <Slideshow src={henry1} aspectRatio={16 / 9} />
                            </div>
                        </div>
                    </div>
                </Henry>

                <William>
                    <Title className="title">
                        william&nbsp;
                        <Role className="role show-desktop">[drone pilot]</Role>
                        <br />
                        d. gardner
                        <Role className="role show-mobile">
                            <br />
                            [drone pilot]
                        </Role>
                    </Title>

                    <Description className="description show-desktop">
                        Hello, I'm William. Stunning aerial
                        <br />
                        footage makes your business stand
                        <br />
                        out. We remove the hurdles and
                        <br />
                        put drones to work for you!
                        <br />
                        <Signature name="William" />
                    </Description>

                    <Description className="description show-mobile">
                        Hello, I'm William.
                        <br />
                        Stunning aerial footage
                        <br />
                        makes your business
                        <br />
                        stand out. We remove
                        <br />
                        the hurdles and put
                        <br />
                        drones to work
                        <br />
                        for you!
                        <Signature name="William" />
                    </Description>

                    <DirectionReveal
                        offsetX={150}
                        offsetY={0}
                        scrollOffset={50}
                        className="portrait"
                    >
                        <StaticImage
                            src="../images/about/william.png"
                            placeholder="none"
                            alt=""
                        />
                    </DirectionReveal>

                    <DirectionReveal
                        offsetX={0}
                        offsetY={-250}
                        scrollOffset={200}
                        className="drone"
                    >
                        <StaticImage
                            src="../images/about/drone.png"
                            placeholder="none"
                            alt=""
                        />
                    </DirectionReveal>

                    <div className="slideshows">
                        <Slideshow src={william1} aspectRatio={16 / 9} />

                        <Slideshow src={william2} aspectRatio={16 / 9} />
                    </div>
                </William>

                <PrettyCoolRight>
                    <TitlePrettyCool>
                        pretty cool,
                        <br />
                        <Highlight>right?</Highlight>
                    </TitlePrettyCool>

                    <div className="rightBox">
                        <Description>
                            Nice meeting you! Let's get in touch about your
                            project.
                        </Description>

                        <ContactForm />
                    </div>
                </PrettyCoolRight>

                <TeamFooter>
                    <DirectionReveal
                        offsetX={-250}
                        offsetY={0}
                        className="portrait luke"
                        scrollOffset={100}
                        ref={footerTrigger}
                    >
                        <StaticImage
                            src="../images/about/luke-footer.png"
                            placeholder="none"
                            alt=""
                        />
                    </DirectionReveal>

                    <DirectionReveal
                        offsetX={0}
                        offsetY={250}
                        scrollOffset={100}
                        className="portrait william"
                        trigger={footerTrigger}
                    >
                        <StaticImage
                            src="../images/about/william-footer.png"
                            placeholder="none"
                            alt=""
                        />
                    </DirectionReveal>

                    <DirectionReveal
                        offsetX={250}
                        offsetY={0}
                        scrollOffset={100}
                        className="portrait henry"
                        trigger={footerTrigger}
                    >
                        <StaticImage
                            src="../images/about/henry-footer.png"
                            placeholder="none"
                            alt=""
                        />
                    </DirectionReveal>
                </TeamFooter>
            </LayoutAbout>

            <Footer />
        </ThemeProvider>
    );
};

export default IndexPage;

export const Head = () => (
    <Header
        title="About"
        description="Counter LLC is a media production company and creative agency based in San Jose, California offering a variety of services including videography, photography, graphic design, real estate, and web development."
    />
);
