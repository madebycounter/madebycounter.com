import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { DarkTheme } from "../global/themes";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { LayoutNarrow } from "../components/Layout";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import Slideshow from "../components/media/Slideshow";
import YouTube from "../components/media/YouTube";

import Asset from "../types/Asset";
import { useServicesPage } from "../types/pages/ServicesPage";

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
                font-weight: 300;

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
    offerings: string[];
    slideshow?: Asset[];
    youtube?: string;
};

const ServiceBlock = ({
    title,
    align,
    slideshow,
    offerings,
    youtube,
}: ServiceProps) => {
    return (
        <ServiceWrapper $align={align}>
            <Title content={title.toLowerCase()} />

            <div>
                <div className="deets">
                    <p>
                        <b>/services</b>
                    </p>
                    {offerings.map((offering, idx) => (
                        <p key={idx}>{offering}</p>
                    ))}
                </div>

                <div className="slideshow">
                    {slideshow && (
                        <Slideshow src={slideshow} aspectRatio={16 / 9} />
                    )}

                    {youtube && <YouTube url={youtube} aspectRatio={16 / 9} />}
                </div>
            </div>
        </ServiceWrapper>
    );
};

const ServicesPage = () => {
    const servicesPage = useServicesPage();

    return (
        <ThemeProvider theme={DarkTheme}>
            <GlobalStyle />

            <Navbar active={"services"} />

            <LayoutNarrow>
                {servicesPage.services.map((service, idx) => (
                    <ServiceBlock
                        key={idx}
                        title={service.title}
                        slideshow={service.slideshow}
                        offerings={service.offerings}
                        youtube={service.youTube}
                        align={idx % 2 === 0 ? "right" : "left"}
                    />
                ))}
            </LayoutNarrow>

            <Footer />
        </ThemeProvider>
    );
};

export default ServicesPage;

export const Head = () => (
    <Header
        location="/services"
        title="Services"
        description="Services offered by Counter LLC."
    />
);
