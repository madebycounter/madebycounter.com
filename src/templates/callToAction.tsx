import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { graphql } from "gatsby";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { LightTheme } from "../global/themes";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { Layout } from "../components/Layout";
import Navbar from "../components/Navbar";
import { Heading1 } from "../components/Typography";
import { Nametag } from "../components/about/Typography";
import Slash from "../components/cards/utils/Slash";
import ContactForm from "../components/forms/ContactForm";
import Media from "../components/media/Media";
import MiniService from "../types/components/MiniService";

import defaultImage from "../images/meta.png";

export const query = graphql`
    query CallToActionData($contentful_id: String) {
        contentfulMiniService(contentful_id: { eq: $contentful_id }) {
            ...MiniService
        }
    }
`;

const CallToAction = styled.div`
    display: flex;
    gap: 2rem;
    height: calc(100vh);
`;

const FormBox = styled.div`
    position: relative;
    padding-top: 2rem;
    padding-left: 2rem;
`;

const CtaSlash = styled(Slash)`
    position: absolute;
    height: 100%;
    left: calc(100% + 2rem);
    top: 0;
`;

type CallToActionProps = {
    data: {
        contentfulMiniService: MiniService;
    };
};

const CallToActionPage = ({ data }: CallToActionProps) => {
    const cta = data.contentfulMiniService;

    return (
        <ThemeProvider theme={LightTheme}>
            <GlobalStyle />

            {/* <Navbar active="services" /> */}

            <CallToAction>
                <FormBox>
                    <Nametag>Get in touch:</Nametag>

                    <br />

                    <ContactForm
                        formContext={{
                            pageUri: `madebycounter.com/contact/${cta.slug}`,
                            pageName: `Counter | ${cta.title}`,
                        }}
                    />

                    <CtaSlash />
                </FormBox>

                <Media src={cta.image} resizeMode="cover" />
            </CallToAction>
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
