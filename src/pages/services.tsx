import { graphql, useStaticQuery } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import richTextOptions from "../global/richTextOptions";
import { DarkTheme } from "../global/themes";
import { ServiceData, SlideshowData } from "../global/types";

import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import Slideshow from "../components/media/Slideshow";
import YouTube from "../components/media/YouTube";

type ServiceWrapperProps = {
    $align: "left" | "right";
};

const ServiceWrapper = styled.div<ServiceWrapperProps>`
    text-align: ${(props) => props.$align};
    margin-bottom: 3rem;

    > div {
        display: flex;
        flex-direction: ${(props) =>
            props.$align === "left" ? "row-reverse" : "row"};
        gap: 1rem;

        .slideshow {
            flex: 2;
        }

        .deets {
            flex: 1;

            p {
                --size: min(1.5rem, 6vw);
                margin: 0;
                font-size: var(--size);
                line-height: calc(var(--size) * 1.13);

                b {
                    font-family: var(--heading-font);
                    font-weight: 400;
                }
            }
        }
    }

    @media (max-width: 700px) {
        text-align: left;

        > div {
            flex-direction: column-reverse;
        }
    }
`;

type ServiceProps = {
    title: string;
    align: "left" | "right";
    description: any;
    slideshow?: SlideshowData;
    youtube?: string;
};

const Service = ({
    title,
    align,
    slideshow,
    description,
    youtube,
}: ServiceProps) => {
    return (
        <ServiceWrapper $align={align}>
            <Title content={title.toLowerCase()} />

            <div>
                <div className="deets">
                    {renderRichText(description, richTextOptions)}
                </div>

                <div className="slideshow">
                    {slideshow && <Slideshow src={slideshow} />}

                    {youtube && <YouTube url={youtube} aspectRatio={16 / 9} />}
                </div>
            </div>
        </ServiceWrapper>
    );
};

const ServicesPage = () => {
    const data: {
        allContentfulService: {
            nodes: ServiceData[];
        };
    } = useStaticQuery(graphql`
        query AllServices {
            allContentfulService(sort: { order: ASC }) {
                nodes {
                    name
                    youTube
                    slideshow {
                        ...Slideshow
                    }
                    description {
                        raw
                    }
                }
            }
        }
    `);

    const nodes = data.allContentfulService.nodes;

    return (
        <ThemeProvider theme={DarkTheme}>
            <GlobalStyle />

            <Navbar active={"services"} />

            <Content>
                {nodes.map((service, idx) => (
                    <Service
                        key={idx}
                        title={service.name}
                        slideshow={service.slideshow}
                        description={service.description}
                        youtube={service.youTube}
                        align={idx % 2 === 0 ? "right" : "left"}
                    />
                ))}
            </Content>

            <Footer />
        </ThemeProvider>
    );
};

export default ServicesPage;

export const Head = () => <Header title="Services" description="" />;
