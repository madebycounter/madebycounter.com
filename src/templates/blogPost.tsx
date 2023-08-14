import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import richTextOptions from "../global/richTextOptions";
import { LightTheme } from "../global/themes";
import { BlogPostData } from "../global/types";

import Author from "../components/Author";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Media, { ResizeMode } from "../components/media/Media";

const StyledBlogBanner = styled.div`
    width: 100%;

    .gatsby-image-wrapper {
        max-height: 500px;
        div {
            max-height: 500px;
        }
    }

    .gif-wrapper,
    .video-wrapper {
        img,
        video {
            max-height: 500px;
        }
    }
`;

type BlogPostProps = {
    data: {
        contentfulBlogPost: BlogPostData;
    };
};

const BlogPost = ({ data }: BlogPostProps) => {
    const { title, author, date, content, banner, bannerMiddle } =
        data.contentfulBlogPost;

    return (
        <ThemeProvider theme={LightTheme}>
            <GlobalStyle />

            <Navbar active="blog" />

            <StyledBlogBanner>
                <Media
                    src={banner}
                    center={bannerMiddle}
                    resizeMode={ResizeMode.Fill}
                    aspectRatio={0}
                />
            </StyledBlogBanner>

            <Content>
                <h1>{title}</h1>

                <Author author={author} date={date} />

                <div>{renderRichText(content, richTextOptions)}</div>
            </Content>

            <Footer />
        </ThemeProvider>
    );
};

export default BlogPost;

export const Head = ({ data }: BlogPostProps) => (
    <Header title={data.contentfulBlogPost.title} description="" />
);

export const query = graphql`
    query ($contentful_id: String!) {
        contentfulBlogPost(contentful_id: { eq: $contentful_id }) {
            title
            author
            date(formatString: "MMMM D, YYYY")
            banner {
                ...Media
            }
            bannerMiddle
            content {
                raw
                references {
                    ... on ContentfulAsset {
                        contentful_id
                        title
                        description
                        publicUrl
                        gatsbyImageData
                        __typename
                        mimeType
                    }
                    ... on ContentfulSocialMediaEmbed {
                        contentful_id
                        title
                        platform
                        url
                    }
                }
            }
        }
    }
`;
