import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { graphql } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { LightTheme } from "../global/themes";
import useSize from "../global/useSize";

import Footer from "../components/Footer";
import Header from "../components/Header";
import HorizontalCollection from "../components/HorizontalCollection";
import MarkupSwap, { MobileSplit } from "../components/MobileSwap";
import Navbar from "../components/Navbar";
import Parallax, { ParallaxDriver } from "../components/Parallax";
import Details from "../components/PortfolioDetails";
import { Heading1, Heading2, Paragraph } from "../components/Typography";
import Pitch from "../components/about/Pitch";
import { BlogCard } from "../components/cards/BlogCard";
import { BlogEmbed } from "../components/cards/BlogEmbed";
import { PortfolioCard } from "../components/cards/PortfolioCard";
import { PortfolioEmbed } from "../components/cards/PortfolioEmbed";
import ServiceCard from "../components/cards/ServiceCard";
import ContactForm from "../components/forms/ContactForm";
import { ResponsiveGallery } from "../components/media/Gallery";
import Lightbox from "../components/media/Lightbox";
import Media, { isVideo } from "../components/media/Media";
import Slideshow from "../components/media/Slideshow";
import YouTube from "../components/media/YouTube";

import defaultImage from "../images/meta.png";

import Asset from "../types/Asset";
import { useBlogPosts } from "../types/BlogPost";
import PortfolioItem, {
    SidebarElement,
    getSidebar,
    usePortfolioItems,
} from "../types/PortfolioItem";
import Service from "../types/Service";

export const query = graphql`
    query PortfolioItemData($contentful_id: String) {
        contentfulPortfolioItem(contentful_id: { eq: $contentful_id }) {
            ...PortfolioItem
        }
    }
`;

function renderSidebarItem(item: SidebarElement) {
    switch (item.__typename) {
        case "ContentfulBlogPost":
            return <BlogEmbed item={item} />;
        case "ContentfulPortfolioItem":
            return <PortfolioEmbed item={item} />;
        case "ContentfulService":
            return <ServiceCard item={item} />;
    }
}

const HeroInfo = styled.div``;

const HeroInfoTitle = styled(Heading1)`
    font-size: 5rem;
`;

const HeroInfoDetails = styled(Details)`
    font-size: 1.6rem;
    margin: 0;
`;

const HeroMedia = styled.div`
    margin-bottom: 0.5rem;

    @media (max-width: 870px) {
        width: 100%;
        aspect-ratio: 16 / 9;
        margin: 0;
    }
`;

const HeroInfoWrapper = styled.div<{ $height?: number }>`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: ${(props) => props.$height}px;

    @media (max-width: 1400px) {
        ${HeroInfoTitle} {
            font-size: 3.5rem;
        }

        ${HeroInfoDetails} {
            font-size: 1.2rem;
        }
    }

    @media (max-width: 1000px) {
        ${HeroInfoTitle} {
            font-size: 2.5rem;
        }

        ${HeroInfoDetails} {
            font-size: 1rem;
        }
    }

    @media (max-width: 870px) {
        ${HeroInfoTitle} {
            font-size: 3rem;
        }

        ${HeroInfoDetails} {
            font-size: 1.2rem;
        }
    }
`;

const PortfolioLayout = styled.div`
    display: flex;
    align-items: flex-start;

    max-width: 1800px;
    margin: auto;
    gap: 0rem;
`;

const GalleryWrapper = styled(ParallaxDriver)`
    flex: 1;
`;

const PitchWrapper = styled(Parallax)`
    width: 500px;

    display: flex;
    flex-direction: column;
    padding: 1rem;

    gap: 2rem;

    @media (max-width: 1400px) {
        width: 400px;
    }
`;

const ContactWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const MobileLayout = styled.div`
    width: calc(100%);
    display: flex;

    > div {
        width: 100%;
    }
`;

const MobileMargined = styled.div`
    margin: 0 0.5rem;
`;

const MobilePcr = styled(Heading1)`
    font-size: 4rem;
`;

const FixedHeightScroller = styled(HorizontalCollection)`
    display: grid;
    grid-auto-flow: column;
    gap: 0.5rem;
    padding: 0 0.5rem;
    margin: 0.5rem 0;

    > * {
        flex-grow: 1;
    }
`;

function arrangeImageScrollers(
    images: Asset[],
    maxPerRow: number = 6,
): Asset[][] {
    var rowsRequired = Math.ceil(images.length / maxPerRow);
    var quantityPerRow = Math.ceil(images.length / rowsRequired);
    var rows: Asset[][] = [];

    for (let i = 0; i < rowsRequired; i++) {
        rows.push(images.slice(i * quantityPerRow, (i + 1) * quantityPerRow));
    }

    return rows;
}

type PortfolioItemProps = {
    data: {
        contentfulPortfolioItem: PortfolioItem;
    };
};

const PortfolioItemPage = ({ data }: PortfolioItemProps) => {
    const [mediaRef, mediaSize] = useSize<HTMLDivElement>();
    const [detailsRef, detailsSize] = useSize<HTMLDivElement>();
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

            <MarkupSwap width={870} display="flex">
                <PortfolioLayout>
                    <GalleryWrapper ref={driverRef}>
                        <HeroMedia ref={mediaRef}>
                            {!youTube && (
                                <Slideshow
                                    src={slideshow}
                                    autoplayDelay={5000}
                                    autoplayOffset={0}
                                    autoplay={!videoOnly}
                                    aspectRatio={4096 / 2160}
                                    onClick={openLightbox}
                                />
                            )}

                            {youTube && (
                                <YouTube
                                    url={youTube}
                                    aspectRatio={4096 / 2160}
                                />
                            )}
                        </HeroMedia>

                        <ResponsiveGallery
                            images={gallery}
                            onClick={openLightbox}
                        />
                    </GalleryWrapper>

                    <PitchWrapper
                        driverRef={driverRef}
                        offset={mediaSize.height - detailsSize.height}
                    >
                        <HeroInfoWrapper $height={mediaSize.height - 8}>
                            <HeroInfo ref={detailsRef}>
                                <HeroInfoTitle>{title}</HeroInfoTitle>

                                <HeroInfoDetails
                                    date={date}
                                    tags={tags}
                                    description={description}
                                />
                            </HeroInfo>
                        </HeroInfoWrapper>

                        {getSidebar(data.contentfulPortfolioItem).map(
                            (item, idx) => (
                                <div key={idx}>{renderSidebarItem(item)}</div>
                            ),
                        )}

                        <ContactWrapper>
                            <Heading1>
                                Pretty cool,
                                <br />
                                right?
                            </Heading1>

                            <ContactForm
                                formContext={{
                                    pageUri: `madebycounter.com/portfolio/${data.contentfulPortfolioItem.slug}`,
                                    pageName: `Counter | ${data.contentfulPortfolioItem.title}`,
                                }}
                            />
                        </ContactWrapper>
                    </PitchWrapper>
                </PortfolioLayout>

                <MobileLayout>
                    <div>
                        <HeroMedia>
                            {!youTube && (
                                <Slideshow
                                    src={slideshow}
                                    autoplayDelay={5000}
                                    autoplayOffset={0}
                                    autoplay={!videoOnly}
                                    aspectRatio={4096 / 2160}
                                    onClick={openLightbox}
                                />
                            )}

                            {youTube && (
                                <YouTube
                                    url={youTube}
                                    aspectRatio={4096 / 2160}
                                />
                            )}
                        </HeroMedia>

                        <MobileMargined>
                            <HeroInfoWrapper>
                                <HeroInfo>
                                    <HeroInfoTitle>{title}</HeroInfoTitle>

                                    <HeroInfoDetails
                                        date={date}
                                        tags={tags}
                                        description={description}
                                    />
                                </HeroInfo>
                            </HeroInfoWrapper>
                        </MobileMargined>

                        {arrangeImageScrollers(gallery).map((row, i) => (
                            <FixedHeightScroller key={i}>
                                {row.map((item, j) => (
                                    <Media
                                        src={item}
                                        key={j}
                                        height={200}
                                        onClick={openLightbox}
                                    />
                                ))}
                            </FixedHeightScroller>
                        ))}

                        {/* <MobileMargined>
                            {getSidebar(data.contentfulPortfolioItem)
                                .filter(
                                    (item) =>
                                        item.__typename === "ContentfulService",
                                )
                                .map((item, idx) => (
                                    <ServiceCard
                                        item={item as Service}
                                        key={idx}
                                    />
                                ))}
                        </MobileMargined> */}

                        <HorizontalCollection>
                            {getSidebar(data.contentfulPortfolioItem)
                                .filter(
                                    (item) =>
                                        item.__typename !== "ContentfulService",
                                )
                                .map((item, idx) => {
                                    switch (item.__typename) {
                                        case "ContentfulBlogPost":
                                            return (
                                                <BlogCard
                                                    item={item}
                                                    key={idx}
                                                />
                                            );
                                        case "ContentfulPortfolioItem":
                                            return (
                                                <PortfolioCard
                                                    item={item}
                                                    key={idx}
                                                />
                                            );
                                    }
                                })}
                        </HorizontalCollection>

                        <MobileMargined>
                            <ContactWrapper>
                                <MobilePcr>Pretty cool, right?</MobilePcr>

                                <ContactForm
                                    formContext={{
                                        pageUri: `madebycounter.com/portfolio/${data.contentfulPortfolioItem.slug}`,
                                        pageName: `Counter | ${data.contentfulPortfolioItem.title}`,
                                    }}
                                />
                            </ContactWrapper>
                        </MobileMargined>
                    </div>
                </MobileLayout>
            </MarkupSwap>

            {/* <ParallaxWrapper>
                <PitchWrapper driverRef={driverRef}>
                    <PortfolioEmbed item={portfolioItems[0]} />

                    <BlogEmbed item={blogPosts[0]} />

                    <PortfolioEmbed item={portfolioItems[1]} />

                    <BlogEmbed item={blogPosts[5]} />

                    <PortfolioEmbed item={portfolioItems[2]} />

                    <Heading1>
                        Pretty cool,
                        <br />
                        right?
                    </Heading1>

                    <ContactForm
                        formContext={{
                            pageUri: "",
                            pageName: "",
                        }}
                    />
                </PitchWrapper>

                <GalleryWrapper ref={driverRef}>
                    <ResponsiveGallery
                        images={gallery}
                        onClick={openLightbox}
                    />
                </GalleryWrapper>
            </ParallaxWrapper> */}

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
