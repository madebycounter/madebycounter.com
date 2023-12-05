import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { portfolioOptions } from "../global/richTextOptions";
import { renderPlainText } from "../global/textHelpers";
import { LightTheme } from "../global/themes";

import ButtonRight from "../components/Button";
import { GalleryCarousel } from "../components/Carousel";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Layout, LayoutNarrow } from "../components/Layout";
import MarkupSwap from "../components/MobileSwap";
import Navbar from "../components/Navbar";
import { Heading1, Heading2, Paragraph } from "../components/Typography";
import { BlogCard } from "../components/cards/BlogCard";
import { PortfolioCard } from "../components/cards/PortfolioCard";
import Slideshow from "../components/media/Slideshow";
import YouTube from "../components/media/YouTube";
import FunFact from "../components/pitch/FunFact";
import MiniService from "../components/pitch/MiniServiceCard";

import { packRichText } from "../types/RichText";
import Service, { PitchElement, getPitch } from "../types/Service";
import MediaCollection from "../types/collections/MediaCollection";

const Columns = styled.div`
    display: flex;
    gap: 1rem;

    > * {
        flex: 1;
    }

    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

const PitchElementWrapper = styled(LayoutNarrow)`
    margin: 2rem auto;
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
        contentfulService: Service;
    };
};

function renderPitchElement(
    element: PitchElement,
    key: number,
    buttonImages: MediaCollection,
) {
    switch (element.__typename) {
        case "ContentfulFunFact":
            return (
                <PitchElementWrapper key={key}>
                    <FunFact
                        author={element.teamMember}
                        fact={renderPlainText(element.content)}
                        carousel={buttonImages.items}
                        cta={element.buttonText}
                    />
                </PitchElementWrapper>
            );
        case "ContentfulMediaCollection":
            return (
                <GalleryCarousel
                    key={key}
                    images={element.items}
                    targetHeight={1}
                />
            );
        case "ContentfulMiniServiceCollection":
            return (
                <PitchElementWrapper key={key}>
                    <Columns>
                        {element.items.map((item, idx) => (
                            <MiniService
                                key={idx}
                                src={item}
                                to={`/cta/${item.slug}`}
                            />
                        ))}
                    </Columns>
                </PitchElementWrapper>
            );
        case "ContentfulPortfolioItemCollection":
            return (
                <PitchElementWrapper key={key}>
                    <Columns>
                        {element.items.map((item, idx) => (
                            <PortfolioCard item={item} key={idx} />
                        ))}
                    </Columns>
                </PitchElementWrapper>
            );
        case "ContentfulBlogPostCollection":
            return (
                <PitchElementWrapper key={key}>
                    <Columns>
                        {element.items.map((item, idx) => (
                            <BlogCard item={item} key={idx} />
                        ))}
                    </Columns>
                </PitchElementWrapper>
            );
        default:
            return (
                <PitchElementWrapper key={key}>
                    <p>Renderer not implemented for {element.__typename}</p>
                </PitchElementWrapper>
            );
    }
}

export default function ServicePage({ data }: PitchPageProps) {
    const pageData = data.contentfulService;
    const pitchData = getPitch(pageData);

    return (
        <ThemeProvider theme={LightTheme}>
            <GlobalStyle />

            <Navbar active="services" />

            <Layout>
                <Hero>
                    <HeroDetails>
                        <HeroHeading>{pageData.pitchTitle}</HeroHeading>

                        <Paragraph>
                            {renderRichText(
                                packRichText(pageData.description),
                                portfolioOptions,
                            )}
                        </Paragraph>

                        <HeroButton to="#" type="normal" direction="right">
                            {pageData.callToAction}
                        </HeroButton>
                    </HeroDetails>

                    <HeroSlideshow>
                        {!pageData.youTube && (
                            <Slideshow
                                src={pageData.slideshow.items}
                                aspectRatio={16 / 9}
                            />
                        )}

                        {pageData.youTube && (
                            <YouTube
                                url={pageData.youTube}
                                aspectRatio={16 / 9}
                            />
                        )}
                    </HeroSlideshow>
                </Hero>
            </Layout>

            {pitchData.map((element, idx) =>
                renderPitchElement(element, idx, pageData.buttonImages),
            )}

            {/* 
            <FunFact
                author={pageData.teamMember}
                fact="Did you know, 70% of businesses report an increase in sales after updating their Instagram and social media platforms?"
                carousel={pageData.slideshow.items}
                cta="Learn More"
            />

            <GalleryCarousel
                images={pageData.slideshow.items}
                targetHeight={1}
            />
 */}
            <Footer />
        </ThemeProvider>
    );
}

export const query = graphql`
    query ($contentful_id: String!) {
        contentfulService(contentful_id: { eq: $contentful_id }) {
            ...Service
        }
    }
`;

export const Head = ({ data }: PitchPageProps) => {
    const pageData = data.contentfulService;

    return (
        <Header
            location={`/services/${pageData.slug}`}
            title={pageData.title}
            description={"Our service!"}
        />
    );
};
