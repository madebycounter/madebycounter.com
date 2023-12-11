import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { graphql } from "gatsby";
import React, { useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { LightTheme } from "../global/themes";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { Layout, LayoutNarrow } from "../components/Layout";
import Navbar from "../components/Navbar";
import Parallax, { ParallaxDriver } from "../components/Parallax";
import Details from "../components/PortfolioDetails";
import { Heading1, Heading2, Paragraph } from "../components/Typography";
import { BlogCard } from "../components/cards/BlogCard";
import { BlogEmbed } from "../components/cards/BlogEmbed";
import { PortfolioCard } from "../components/cards/PortfolioCard";
import { PortfolioEmbed } from "../components/cards/PortfolioEmbed";
import { ResponsiveGallery } from "../components/media/Gallery";
import Lightbox from "../components/media/Lightbox";
import { isVideo } from "../components/media/Media";
import Slideshow from "../components/media/Slideshow";
import YouTube from "../components/media/YouTube";

import defaultImage from "../images/meta.png";

import { useBlogPosts } from "../types/BlogPost";
import PortfolioItem, { usePortfolioItems } from "../types/PortfolioItem";

export const query = graphql`
    query PortfolioItemData($contentful_id: String) {
        contentfulPortfolioItem(contentful_id: { eq: $contentful_id }) {
            ...PortfolioItem
        }
    }
`;

const Hero = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 4rem;
    max-width: 1800px;
    margin: auto;
    padding: 1rem;
    flex-wrap: wrap-reverse;
`;

const HeroInfo = styled.div`
    flex: 2;
    min-width: 450px;
`;

const HeroInfoTitle = styled(Heading1)`
    font-size: 5rem;
`;

const HeroInfoDetails = styled(Details)`
    font-size: 1.6rem;
`;

const HeroMedia = styled.div`
    flex: 3;
    min-width: 800px;

    @media (max-width: 900px) {
        min-width: 100%;
    }
`;

const ParallaxWrapper = styled.div`
    display: flex;
    gap: 2rem;
    max-width: 1800px;
    margin: auto;
    padding: 1rem;
    padding-top: 2rem;
    align-items: flex-start;
`;

const PitchWrapper = styled(Parallax)`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    flex: 1;
    min-width: 350px;

    > div {
        margin: 0;
    }
`;

const GalleryWrapper = styled(ParallaxDriver)`
    flex: 3;
`;

type PortfolioItemProps = {
    data: {
        contentfulPortfolioItem: PortfolioItem;
    };
};

const PortfolioItemPage = ({ data }: PortfolioItemProps) => {
    const driverRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState({
        lightbox: false,
        lightboxCurrent: "",
    });

    const { title, date, tags, description, youTube } =
        data.contentfulPortfolioItem;

    const slideshow = data.contentfulPortfolioItem.slideshow || [];
    const gallery = data.contentfulPortfolioItem.gallery || [];

    // Do not autoplay if slideshow is a series of video clips
    var videoOnly = slideshow.length != 0 && isVideo(slideshow[0].mimeType);

    for (let i = 1; i < slideshow.length; i++) {
        if (!isVideo(slideshow[i].mimeType)) {
            return <p>Video elements may not be mixed with images</p>;
        }
    }

    const closeLightbox = () => {
        setState({
            ...state,
            lightbox: false,
        });
    };

    const openLightbox = (cfid: string) => {
        setState({
            lightbox: true,
            lightboxCurrent: cfid,
        });
    };

    const portfolioItems = usePortfolioItems();
    const blogPosts = useBlogPosts();

    return (
        <ThemeProvider theme={LightTheme}>
            <GlobalStyle />

            <Navbar active="portfolio" />

            <Hero>
                <HeroInfo>
                    <HeroInfoTitle>{title}</HeroInfoTitle>

                    <HeroInfoDetails
                        date={date}
                        tags={tags}
                        description={description}
                    />
                </HeroInfo>

                <HeroMedia>
                    {!youTube && (
                        <Slideshow
                            src={slideshow}
                            autoplayDelay={5000}
                            autoplayOffset={0}
                            autoplay={!videoOnly}
                            aspectRatio={16 / 9}
                            onClick={openLightbox}
                        />
                    )}

                    {youTube && <YouTube url={youTube} />}
                </HeroMedia>
            </Hero>

            <ParallaxWrapper>
                <PitchWrapper driverRef={driverRef}>
                    <PortfolioCard item={portfolioItems[0]} />

                    <BlogCard item={blogPosts[0]} />

                    <PortfolioCard item={portfolioItems[1]} />

                    <BlogCard item={blogPosts[5]} />

                    <PortfolioCard item={portfolioItems[2]} />
                </PitchWrapper>

                <GalleryWrapper ref={driverRef}>
                    <ResponsiveGallery
                        images={gallery}
                        onClick={openLightbox}
                    />
                </GalleryWrapper>
            </ParallaxWrapper>

            <LayoutNarrow></LayoutNarrow>

            <Lightbox
                media={slideshow.concat(gallery)}
                open={state.lightbox}
                current={state.lightboxCurrent}
                close={closeLightbox}
            />

            <Footer />
        </ThemeProvider>
    );
};

export default PortfolioItemPage;

export const Head = ({ data }: PortfolioItemProps) => (
    <Header
        location={`/portfolio/${data.contentfulPortfolioItem.slug}`}
        title={data.contentfulPortfolioItem.title}
        description={documentToPlainTextString(
            JSON.parse(data.contentfulPortfolioItem.description.raw),
        )}
        image={
            data.contentfulPortfolioItem.metaImage.gatsbyImageData?.images
                .fallback?.src || defaultImage
        }
    />
);
