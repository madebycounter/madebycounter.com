import { graphql } from "gatsby";
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { LightTheme } from "../global/themes";
import { MediaData, PortfolioData } from "../global/types";

import Column from "../components/Column";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Gallery from "../components/media/Gallery";
import Lightbox from "../components/media/Lightbox";
import Slideshow from "../components/media/Slideshow";
import YouTube from "../components/media/YouTube";
import Details from "../components/portfolio/Details";

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

        h1 {
            margin-top: 0;
            margin-bottom: 1rem;
            letter-spacing: calc(min(4rem, 12vw) / -21);
            font-size: min(4rem, 12vw);
            line-height: 1;
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
        contentfulPortfolioItem: PortfolioData;
    };
};

const PortfolioItem = ({ data }: PortfolioItemProps) => {
    const [state, setState] = useState({
        lightbox: false,
        lightboxCurrent: "",
    });

    const { title, date, tags, description, youtube } =
        data.contentfulPortfolioItem;

    const slideshow = data.contentfulPortfolioItem.slideshow || [];
    const gallery = data.contentfulPortfolioItem.gallery || [];

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

            <Content>
                <StyledHeader>
                    <div className="info">
                        <h1>{title}</h1>
                        <Details
                            date={date}
                            tags={tags}
                            description={description.description}
                        />
                    </div>

                    <div className="cover">
                        {!youtube && (
                            // hack to convert array of images into slideshow object
                            // TODO: convert portfolio image arrays into slideshows
                            <Slideshow
                                src={{
                                    contentful_id: "",
                                    content: slideshow,
                                    autoplayDelay: 5000,
                                    autoplayOffset: 0,
                                    autoplay: slideshow.length !== 0,
                                }}
                                aspectRatio={16 / 9}
                                onClick={openLightbox}
                            />
                        )}

                        {youtube && <YouTube url={youtube} />}
                    </div>
                </StyledHeader>

                <Column>
                    <Gallery images={gallery} onClick={openLightbox} />
                </Column>
            </Content>

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

export default PortfolioItem;

type PortfolioHeadProps = {
    data: Queries.PortfolioItemDataQuery;
};

export const Head = ({ data }: PortfolioHeadProps) => (
    <Header
        title={data.contentfulPortfolioItem?.title || "Portfolio Item"}
        description=""
    />
);
