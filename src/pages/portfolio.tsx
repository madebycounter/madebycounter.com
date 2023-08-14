import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { DarkTheme } from "../global/themes";
import { MediaData, PortfolioData } from "../global/types";

import Column from "../components/Column";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { FadeReveal } from "../components/Revealer";
import Media from "../components/media/Media";

const ItemBox = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;

    @media (min-width: 700px) {
        .fade-revealer {
            transition: none;
            opacity: 1;
        }
    }
`;

const StyledItem = styled.div`
    a {
        text-decoration: none;
        color: inherit;
    }

    .info {
        gap: 1rem;

        display: flex;
        justify-content: space-between;

        h2 {
            font-size: 1.6rem;
            margin: 0.5rem 0;
            letter-spacing: -0.988235px;
            line-height: 25.6px;
        }

        p {
            font-size: 1rem;
            line-height: 1;
            text-align: right;
            margin: 0.5rem 0;
            font-weight: 300;

            span {
                white-space: nowrap;
            }
        }
    }
`;

type ItemProps = {
    image: MediaData;
    title: string;
    tags: string[];
    href: string;
};

const Item = ({ image, title, tags, href }: ItemProps) => {
    return (
        <StyledItem>
            <Link to={href}>
                <Media src={image} aspectRatio={16 / 9} />

                <div className="info">
                    <h2>{title}</h2>

                    <p>
                        {tags.map((tag, idx) => (
                            <span key={idx}>
                                {tag}
                                <br />
                            </span>
                        ))}
                    </p>
                </div>
            </Link>
        </StyledItem>
    );
};

const PortfolioPage = () => {
    const data: {
        allContentfulPortfolioItem: {
            nodes: PortfolioData[];
        };
    } = useStaticQuery(graphql`
        {
            allContentfulPortfolioItem(sort: { date: DESC }) {
                nodes {
                    ...PortfolioItem
                }
            }
        }
    `);

    const nodes = data.allContentfulPortfolioItem.nodes;

    return (
        <ThemeProvider theme={DarkTheme}>
            <GlobalStyle />

            <Navbar active={"portfolio"} />

            <Content>
                <Column>
                    <ItemBox>
                        {nodes.map((node, idx) => (
                            <FadeReveal
                                className="fade-revealer"
                                duration={500}
                                key={idx}
                            >
                                <Item
                                    image={node.thumbnail}
                                    title={node.title}
                                    tags={node.tags}
                                    href={`/portfolio/${node.slug}`}
                                />
                            </FadeReveal>
                        ))}
                    </ItemBox>
                </Column>
            </Content>

            <Footer />
        </ThemeProvider>
    );
};

export default PortfolioPage;

export const Head = () => <Header title="Portfolio" description="" />;

export const query = graphql`
    fragment PortfolioItem on ContentfulPortfolioItem {
        title
        date(formatString: "MM.DD.YYYY")
        tags
        description {
            description
        }
        slug
        youtube
        thumbnail {
            ...Media
        }
        slideshow {
            ...Media
        }
        gallery {
            ...Media
        }
    }
`;
