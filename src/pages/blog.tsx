import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { LightTheme } from "../global/themes";
import { BlogPostData } from "../global/types";

import Author from "../components/Author";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Layout } from "../components/Layout";
import Navbar from "../components/Navbar";
import { Heading3 } from "../components/Typography";
import Media from "../components/media/Media";

import BlogPost from "../types/BlogPost";

const BlogList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;

    @media (min-width: 700px) {
        .fade-revealer {
            transition: none;
            opacity: 1;
        }
    }

    ${Heading3} {
        margin: 0.5rem 0;
    }
`;

const BlogPage = () => {
    const data: {
        allContentfulBlogPost: {
            nodes: BlogPost[];
        };
    } = useStaticQuery(graphql`
        {
            allContentfulBlogPost(sort: { date: DESC }) {
                nodes {
                    ...BlogPost
                }
            }
        }
    `);

    const nodes = data.allContentfulBlogPost.nodes;

    return (
        <ThemeProvider theme={LightTheme}>
            <GlobalStyle />

            <Navbar active={"blog"} />

            <Layout>
                <BlogList>
                    {nodes.map(({ author, date, slug, title, banner }, idx) => (
                        <div key={idx}>
                            <Link to={`/blog/${slug}`}>
                                <Media src={banner} aspectRatio={4 / 3} />
                            </Link>

                            <Heading3>
                                <Link to={`/blog/${slug}`}>{title}</Link>
                            </Heading3>

                            <Author author={author} date={date} />
                        </div>
                    ))}
                </BlogList>
            </Layout>

            <Footer />
        </ThemeProvider>
    );
};

export default BlogPage;

export const Head = () => (
    <Header
        location="/blog"
        title="Blog"
        description="All the latest updates from the team."
    />
);
