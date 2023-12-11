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
import Details from "../components/PortfolioDetails";
import { Heading1 } from "../components/Typography";
import { Gallery, ResponsiveGallery } from "../components/media/Gallery";
import Lightbox from "../components/media/Lightbox";
import { isVideo } from "../components/media/Media";
import Slideshow from "../components/media/Slideshow";
import YouTube from "../components/media/YouTube";
import MiniService from "../types/components/MiniService";

import defaultImage from "../images/meta.png";

export const query = graphql`
    query CallToActionData($contentful_id: String) {
        contentfulMiniService(contentful_id: { eq: $contentful_id }) {
            ...MiniService
        }
    }
`;

type CallToActionProps = {
    data: {
        contentfulMiniService: MiniService;
    };
};

const CallToActionPage = ({ data }: CallToActionProps) => {
    return (
        <ThemeProvider theme={LightTheme}>
            <GlobalStyle />

            <Navbar active="portfolio" />

            <Layout>
                <h1>{data.contentfulMiniService.title}</h1>
            </Layout>

            <Footer />
        </ThemeProvider>
    );
};

export default CallToActionPage;

export const Head = ({ data }: CallToActionProps) => (
    <Header
        location={`/contact/${data.contentfulMiniService.slug}`}
        title={data.contentfulMiniService.title}
        description={documentToPlainTextString(
            JSON.parse(data.contentfulMiniService.description.raw),
        )}
        image={
            data.contentfulMiniService.metaImage.gatsbyImageData?.images
                .fallback?.src || defaultImage
        }
    />
);
