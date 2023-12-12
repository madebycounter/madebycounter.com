import { graphql } from "gatsby";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { LightTheme } from "../global/themes";

import { GalleryCarousel } from "../components/Carousel";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HorizontalCollection from "../components/HorizontalCollection";
import { LayoutNarrow, LayoutNarrowNoEdge } from "../components/Layout";
import MobileSwap, { MobileSplit } from "../components/MobileSwap";
import Navbar from "../components/Navbar";
import { Nametag } from "../components/about/Typography";
import { BlogCard } from "../components/cards/BlogCard";
import { PortfolioCard } from "../components/cards/PortfolioCard";
import ContactForm from "../components/forms/ContactForm";
import FunFactCard from "../components/pitch/FunFactCard";
import Hero from "../components/pitch/Hero";
import MiniServiceCard from "../components/pitch/MiniServiceCard";
import TestimonialCard from "../components/pitch/Testimonial";

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
    margin: 4rem 0;
`;

function renderPitchElement(element: PitchElement) {
    switch (element.__typename) {
        case "ContentfulFunFact":
            return (
                <LayoutNarrowNoEdge>
                    <FunFactCard fact={element} />
                </LayoutNarrowNoEdge>
            );
        case "ContentfulMediaCollection":
            return (
                <GalleryCarousel
                    images={element.items}
                    targetHeight={1}
                    columnWidth={200}
                />
            );
        case "ContentfulMiniServiceCollection":
            return (
                <LayoutNarrowNoEdge>
                    <HorizontalCollection>
                        {element.items.map((item, idx) => (
                            <MiniServiceCard key={idx} src={item} />
                        ))}
                    </HorizontalCollection>
                </LayoutNarrowNoEdge>
            );
        case "ContentfulPortfolioItemCollection":
            return (
                <LayoutNarrowNoEdge>
                    <HorizontalCollection>
                        {element.items.map((item, idx) => (
                            <PortfolioCard item={item} key={idx} />
                        ))}
                    </HorizontalCollection>
                </LayoutNarrowNoEdge>
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
                <LayoutNarrowNoEdge>
                    <PitchColumns>
                        <TestimonialCard testimonial={element} />
                    </PitchColumns>
                </LayoutNarrowNoEdge>
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

            <Hero service={pageData} teamMember={pageData.teamMember} />

            {pitchData.map((element, idx) => (
                <PitchElementWrapper key={idx}>
                    {renderPitchElement(element)}
                </PitchElementWrapper>
            ))}

            <LayoutNarrow>
                <MobileSplit>
                    <div>
                        <Nametag>Pretty cool, right?</Nametag>
                    </div>

                    <ContactForm
                        formContext={{
                            pageUri: `madebycounter.com/services/${pageData.slug}`,
                            pageName: `Counter | ${pageData.title}`,
                        }}
                    />
                </MobileSplit>
            </LayoutNarrow>

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
