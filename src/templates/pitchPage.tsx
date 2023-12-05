import { graphql } from "gatsby";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { renderPlainText } from "../global/textHelpers";
import { LightTheme } from "../global/themes";

import { GalleryCarousel } from "../components/Carousel";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Layout, LayoutNarrow } from "../components/Layout";
import Navbar from "../components/Navbar";
import { BlogCard } from "../components/cards/BlogCard";
import { PortfolioCard } from "../components/cards/PortfolioCard";
import FunFact from "../components/pitch/FunFact";
import Hero from "../components/pitch/Hero";
import MiniServiceCard from "../components/pitch/MiniServiceCard";

import Service, { PitchElement, getPitch } from "../types/Service";
import MediaCollection from "../types/collections/MediaCollection";

const PitchColumns = styled.div`
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

function renderPitchElement(
    element: PitchElement,
    key: number,
    buttonImages: MediaCollection,
) {
    switch (element.__typename) {
        case "ContentfulFunFact":
            return (
                <FunFact
                    key={key}
                    author={element.teamMember}
                    fact={renderPlainText(element.content)}
                    carousel={buttonImages.items}
                    cta={element.buttonText}
                />
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
                    <PitchColumns>
                        {element.items.map((item, idx) => (
                            <MiniServiceCard
                                key={idx}
                                src={item}
                                to={`/cta/${item.slug}`}
                            />
                        ))}
                    </PitchColumns>
                </PitchElementWrapper>
            );
        case "ContentfulPortfolioItemCollection":
            return (
                <PitchElementWrapper key={key}>
                    <PitchColumns>
                        {element.items.map((item, idx) => (
                            <PortfolioCard item={item} key={idx} />
                        ))}
                    </PitchColumns>
                </PitchElementWrapper>
            );
        case "ContentfulBlogPostCollection":
            return (
                <PitchElementWrapper key={key}>
                    <PitchColumns>
                        {element.items.map((item, idx) => (
                            <BlogCard item={item} key={idx} />
                        ))}
                    </PitchColumns>
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

type PitchPageProps = {
    data: {
        contentfulService: Service;
    };
};

export default function ServicePage({ data }: PitchPageProps) {
    const pageData = data.contentfulService;
    const pitchData = getPitch(pageData);

    return (
        <ThemeProvider theme={LightTheme}>
            <GlobalStyle />

            <Navbar active="services" />

            <Layout>
                <Hero service={pageData} />
            </Layout>

            {pitchData.map((element, idx) =>
                renderPitchElement(element, idx, pageData.buttonImages),
            )}

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
