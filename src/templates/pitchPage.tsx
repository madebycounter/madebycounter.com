import { graphql } from "gatsby";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { LightTheme } from "../global/themes";

import ButtonRight from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Layout, LayoutNarrow } from "../components/Layout";
import MarkupSwap from "../components/MobileSwap";
import Navbar from "../components/Navbar";
import { Heading1, Heading2, Paragraph } from "../components/Typography";
import Slideshow from "../components/media/Slideshow";
import DetailedService from "../components/pitch/DetailedService";

import { PitchPage } from "../types/pages/PitchPage";

const Columns = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    > div {
        flex: 1 1 250px;
    }
`;

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
    font-size: 2.5rem;

    ${Heading2} {
        padding: 0.1em;
    }
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

            <br />
            <br />

            <LayoutNarrow>
                <Columns>
                    <DetailedService
                        image={pageData.slideshow[0]}
                        title="Virtual Tours"
                        description="High dynamic range photography captures interior settings in their."
                        to="#"
                    />

                    <DetailedService
                        image={pageData.slideshow[0]}
                        title="Virtual Tours"
                        description="High dynamic range photography captures interior settings in their."
                        to="#"
                    />

                    <DetailedService
                        image={pageData.slideshow[0]}
                        title="Virtual Tours"
                        description="High dynamic range photography captures interior settings in their."
                        to="#"
                    />
                </Columns>
            </LayoutNarrow>

            <Footer />
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
