import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { graphql } from "gatsby";
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { LightTheme } from "../global/themes";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { Layout, LayoutNarrow } from "../components/Layout";
import Navbar from "../components/Navbar";
import { Heading1 } from "../components/Typography";
import Gallery from "../components/media/Gallery";
import Lightbox from "../components/media/Lightbox";
import { isVideo } from "../components/media/Media";
import Slideshow from "../components/media/Slideshow";
import YouTube from "../components/media/YouTube";
import Details from "../components/portfolio/Details";

import defaultImage from "../images/meta.png";

import PortfolioItem from "../types/PortfolioItem";

export const query = graphql`
    query PortfolioItemData($contentful_id: String) {
        contentfulPortfolioItem(contentful_id: { eq: $contentful_id }) {
            ...PortfolioItem
        }
    }
`;

const StyledHeader = styled.div`
    display: flex;
    max-width: 1200px;
    margin: auto;
    margin-bottom: 3rem;
    gap: 1rem;

    .info {
        flex: 4;

        ${Heading1} {
            margin-top: 0;
            margin-bottom: 1rem;
        }
    }

    .cover {
        flex: 6;
    }

    @media (max-width: calc(1200px - 4rem)) {
        flex-direction: column-reverse;
        margin-bottom: 1rem;
    }
`;

type PortfolioItemProps = {
    data: {
        contentfulPortfolioItem: PortfolioItem;
    };
};

const PortfolioItemPage = ({ data }: PortfolioItemProps) => {
    const [state, setState] = useState({
        lightbox: false,
        lightboxCurrent: "",
    });

    const { title, date, tags, description, youTube } =
        data.contentfulPortfolioItem;

    const slideshow = data.contentfulPortfolioItem.slideshow || [];
    const gallery = data.contentfulPortfolioItem.gallery || [];

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

    return (
        <ThemeProvider theme={LightTheme}>
            <GlobalStyle />

            <Navbar active="portfolio" />

            <Layout>
                <StyledHeader>
                    <div className="info">
                        <Heading1>{title}</Heading1>
                        <Details
                            date={date}
                            tags={tags}
                            description={description}
                        />
                    </div>

                    <div className="cover">
                        {!youTube && (
                            // hack to convert array of images into slideshow object
                            // TODO: convert portfolio image arrays into slideshows
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
                    </div>
                </StyledHeader>
            </Layout>

            <LayoutNarrow>
                <Gallery images={gallery} onClick={openLightbox} />
            </LayoutNarrow>

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
