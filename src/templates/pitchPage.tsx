import { graphql } from "gatsby";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { renderPlainText } from "../global/textHelpers";
import { LightTheme } from "../global/themes";

import { GalleryCarousel } from "../components/Carousel";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Layout, LayoutNarrow, LayoutNarrowNoEdge } from "../components/Layout";
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

const PitchElementWrapper = styled.div`
    margin: 8rem 0;
`;

function renderPitchElement(
    element: PitchElement,
    buttonImages: MediaCollection,
) {
    switch (element.__typename) {
        case "ContentfulFunFact":
            return (
                <LayoutNarrowNoEdge>
                    <FunFact
                        author={element.teamMember}
                        fact={renderPlainText(element.content)}
                        carousel={buttonImages.items}
                        cta={element.buttonText}
                    />
                </LayoutNarrowNoEdge>
            );
        case "ContentfulMediaCollection":
            return <GalleryCarousel images={element.items} targetHeight={1} />;
        case "ContentfulMiniServiceCollection":
            return (
                <LayoutNarrow>
                    <PitchColumns>
                        {element.items.map((item, idx) => (
                            <MiniServiceCard
                                key={idx}
                                src={item}
                                to={`/cta/${item.slug}`}
                            />
                        ))}
                    </PitchColumns>
                </LayoutNarrow>
            );
        case "ContentfulPortfolioItemCollection":
            return (
                <LayoutNarrow>
                    <PitchColumns>
                        {element.items.map((item, idx) => (
                            <PortfolioCard item={item} key={idx} />
                        ))}
                    </PitchColumns>
                </LayoutNarrow>
            );
        case "ContentfulBlogPostCollection":
            return (
                <LayoutNarrow>
                    <PitchColumns>
                        {element.items.map((item, idx) => (
                            <BlogCard item={item} key={idx} />
                        ))}
                    </PitchColumns>
                </LayoutNarrow>
            );
        default:
            return (
                <LayoutNarrow>
                    <p>Renderer not implemented for {element.__typename}</p>
                </LayoutNarrow>
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

            {pitchData.map((element, idx) => (
                <PitchElementWrapper key={idx}>
                    {renderPitchElement(element, pageData.buttonImages)}
                </PitchElementWrapper>
            ))}

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
