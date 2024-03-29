import { Link } from "gatsby";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { DarkTheme } from "../global/themes";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { LayoutNarrow } from "../components/Layout";
import Navbar from "../components/Navbar";
import { FadeReveal } from "../components/Revealer";
import { Heading3, Tags } from "../components/Typography";
import Media from "../components/media/Media";

import Asset from "../types/Asset";
import { usePortfolioItems } from "../types/PortfolioItem";

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
    ${Heading3} {
        margin: 0.5rem 0;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .info {
        gap: 1rem;

        display: flex;
        justify-content: space-between;

        ${Tags} {
            margin: 0.5rem 0;
            text-align: right;
        }
    }
`;

type ItemProps = {
    image: Asset;
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
                    <Heading3>{title}</Heading3>

                    <Tags>
                        {tags.map((tag, idx) => (
                            <span key={idx}>
                                {tag}
                                <br />
                            </span>
                        ))}
                    </Tags>
                </div>
            </Link>
        </StyledItem>
    );
};

const PortfolioPage = () => {
    const nodes = usePortfolioItems();

    return (
        <ThemeProvider theme={DarkTheme}>
            <GlobalStyle />

            <Navbar active={"portfolio"} />

            <LayoutNarrow>
                <ItemBox>
                    {nodes
                        .filter((obj) => !obj.hidden)
                        .map((node, idx) => (
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
            </LayoutNarrow>
            <Footer />
        </ThemeProvider>
    );
};

export default PortfolioPage;

export const Head = () => (
    <Header
        location="/portfolio"
        title="Portfolio"
        description="Check out our past work!"
    />
);
