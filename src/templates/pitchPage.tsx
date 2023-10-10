import { graphql } from "gatsby";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { LightTheme } from "../global/themes";

import ButtonRight from "../components/Button";
import Header from "../components/Header";
import { Layout } from "../components/Layout";
import MarkupSwap from "../components/MobileSwap";
import Navbar from "../components/Navbar";
import Signature from "../components/Signature";
import { Heading1, Paragraph } from "../components/Typography";
import Media from "../components/media/Media";
import Slideshow from "../components/media/Slideshow";

import { PitchPage } from "../types/pages/PitchPage";

const HeroHeading = styled(Heading1)`
    font-size: 6vw;

    @media (max-width: 1200px) {
        font-size: 4rem;
    }
`;

const HeroDetails = styled.div`
    flex: 1;

    ${Paragraph} {
        max-width: 70%;
    }
`;

const HeroSlideshow = styled.div`
    flex: 1;
`;

const HeroButton = styled(ButtonRight)`
    font-size: 2rem;
`;

const Hero = styled.div`
    display: flex;
    gap: 1rem;

    @media (max-width: 850px) {
        flex-direction: column-reverse;
    }
`;

type PitchPageProps = {
    data: {
        contentfulPitchPage: PitchPage;
    };
};

export default function ServicePage({ data }: PitchPageProps) {
    const pageData = data.contentfulPitchPage;

    return (
        <ThemeProvider theme={LightTheme}>
            <GlobalStyle />

            <Navbar active="services" />

            <Layout>
                <Hero>
                    <HeroDetails>
                        <HeroHeading>
                            Photos are
                            <br />
                            cool, right?
                        </HeroHeading>

                        <MarkupSwap width={1400}>
                            <Paragraph>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Nesciunt nostrum, vero sequi
                                atque dolore tenetur porro consectetur rerum
                                quas cum esse illum omnis excepturi nihil
                                laborum voluptates maiores provident
                                praesentium?
                            </Paragraph>

                            <Paragraph>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Nesciunt nostrum, vero sequi?
                            </Paragraph>
                        </MarkupSwap>

                        <HeroButton to="#">Book Now</HeroButton>
                    </HeroDetails>

                    <HeroSlideshow>
                        <Slideshow
                            src={pageData.slideshow}
                            aspectRatio="original"
                        />
                    </HeroSlideshow>
                </Hero>
            </Layout>
        </ThemeProvider>
    );
}

export const query = graphql`
    query ($contentful_id: String!) {
        contentfulPitchPage(contentful_id: { eq: $contentful_id }) {
            ...PitchPage
        }
    }
`;

export const Head = ({ data }: PitchPageProps) => {
    const pageData = data.contentfulPitchPage;

    return (
        <Header
            location={`/services/${pageData.slug}`}
            title={pageData.title}
            description={"Our service!"}
        />
    );
};
