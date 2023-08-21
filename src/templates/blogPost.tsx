import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import richTextOptions from "../global/richTextOptions";
import { LightTheme } from "../global/themes";
import { BlogPostData } from "../global/types";

import Author from "../components/Author";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Layout, LayoutNarrow } from "../components/Layout";
import Navbar from "../components/Navbar";
import { Heading1 } from "../components/Typography";
import Media, { ResizeMode } from "../components/media/Media";

const StyledBlogBanner = styled.div`
    width: 100%;
    margin-bottom: 1rem;

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

const BlogPostContent = styled.div`
    > div {
        margin: 1rem 0;
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

            <LayoutNarrow>
                <Heading1>{title}</Heading1>

                <Author author={author} date={date} />

                <BlogPostContent>
                    {renderRichText(content, richTextOptions)}
                </BlogPostContent>
            </LayoutNarrow>

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
                    ...Media
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
