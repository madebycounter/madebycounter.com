import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { blogPostOptions } from "../global/richTextOptions";
import { LightTheme } from "../global/themes";

import Author from "../components/Author";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { LayoutNarrow } from "../components/Layout";
import Navbar from "../components/Navbar";
import { Heading1 } from "../components/Typography";
import Lightbox from "../components/media/Lightbox";
import Media, { ResizeMode } from "../components/media/Media";

import defaultImage from "../images/meta.png";

import BlogPost from "../types/BlogPost";

// https://stackoverflow.com/questions/5454235/shorten-string-without-cutting-words-in-javascript
function shorten(str: string, maxLen: number, separator: string = " ") {
    if (str.length <= maxLen) return str;
    return str.substring(0, str.lastIndexOf(separator, maxLen));
}

function generateDescription(content: any) {
    const text = documentToPlainTextString(JSON.parse(content.raw));
    var shortened = shorten(text, 180);

    if (
        shortened.endsWith(".") ||
        shortened.endsWith("!") ||
        shortened.endsWith("?")
    ) {
        return shortened;
    } else if (
        shortened.endsWith(",") ||
        shortened.endsWith(";") ||
        shortened.endsWith(":") ||
        shortened.endsWith(")") ||
        shortened.endsWith("]")
    ) {
        return shortened.substring(0, shortened.length - 1) + "...";
    } else {
        return shortened + "...";
    }
}

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

type BlogPostProps = {
    data: {
        contentfulBlogPost: BlogPost;
    };
};

const BlogPostPage = ({ data }: BlogPostProps) => {
    const [state, setState] = useState({
        lightbox: false,
        lightboxCurrent: "",
    });

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
                    onClick={openLightbox}
                />
            </StyledBlogBanner>

            <LayoutNarrow>
                <Heading1>{title}</Heading1>

                <Author author={author} date={date} />

                <div>
                    {renderRichText(content, blogPostOptions(openLightbox))}
                </div>
            </LayoutNarrow>

            <Lightbox
                media={[banner].concat(
                    content.references.filter(
                        (ref: any) => ref.__typename === "ContentfulAsset",
                    ),
                )}
                open={state.lightbox}
                current={state.lightboxCurrent}
                close={closeLightbox}
            />

            <Footer />
        </ThemeProvider>
    );
};

export default BlogPostPage;

export const Head = ({ data }: BlogPostProps) => (
    <Header
        location={`/blog/${data.contentfulBlogPost.slug}`}
        title={data.contentfulBlogPost.title}
        description={generateDescription(data.contentfulBlogPost.content)}
        image={
            data.contentfulBlogPost.metaImage.gatsbyImageData?.images.fallback
                ?.src || defaultImage
        }
    />
);

export const query = graphql`
    query ($contentful_id: String!) {
        contentfulBlogPost(contentful_id: { eq: $contentful_id }) {
            ...BlogPost
        }
    }
`;
