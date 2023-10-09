import { graphql } from "gatsby";
import React from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { LightTheme } from "../global/themes";

import Header from "../components/Header";
import { Layout } from "../components/Layout";
import Navbar from "../components/Navbar";
import { Heading1 } from "../components/Typography";

import { PitchPage } from "../types/pages/PitchPage";

type PitchPageProps = {
    data: {
        contentfulPitchPage: PitchPage;
    };
};

export default function ServicePage({ data }: PitchPageProps) {
    const pageData = data.contentfulPitchPage;

    return (
        <ThemeProvider theme={LightTheme}>
            <GlobalStyle />

            <Navbar active="services" />

            <Layout>
                <Heading1>{pageData.title}</Heading1>
            </Layout>
        </ThemeProvider>
    );
}

export const query = graphql`
    query ($contentful_id: String!) {
        contentfulPitchPage(contentful_id: { eq: $contentful_id }) {
            ...PitchPage
        }
    }
`;

export const Head = ({ data }: PitchPageProps) => {
    const pageData = data.contentfulPitchPage;

    return (
        <Header
            location={`/services/${pageData.slug}`}
            title={pageData.title}
            description={"Our service!"}
        />
    );
};
