import React from "react";
import styled, { ThemeProvider, css } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { DarkTheme } from "../global/themes";

import Button, { ButtonType } from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { LayoutNarrow } from "../components/Layout";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import LinkDiv from "../components/cards/utils/LinkDiv";
import Slideshow from "../components/media/Slideshow";
import YouTube from "../components/media/YouTube";

import Asset from "../types/Asset";
import MediaCollection from "../types/collections/MediaCollection";
import {
    HorizontalDirection,
    invertDirection,
    invertHorizontal,
} from "../types/directions";
import { useServicesPage } from "../types/pages/ServicesPage";

const ServiceWrapper = styled.div<{ $align: HorizontalDirection }>`
    display: grid;
    grid-template-rows: auto 1fr auto;
    column-gap: 1rem;

    @media (max-width: 900px) {
        column-gap: 0.5rem;
        row-gap: 0.5rem;
        margin: 2rem 0;
    }

    ${(props) => {
        switch (props.$align) {
            case "left":
                return css`
                    grid-template-areas: "title title" "media details" "media button";
                    grid-template-columns: 2fr 1fr;
                    text-align: left;

                    @media (max-width: 900px) {
                        grid-template-areas: "title title" "media details" "button button";
                    }
                `;
            case "right":
                return css`
                    grid-template-areas: "title title" "details media" "button media";
                    grid-template-columns: 1fr 2fr;
                    text-align: right;

                    @media (max-width: 900px) {
                        grid-template-areas: "title title" "details media" "button button";
                    }
                `;
        }
    }}
`;

const TitleArea = styled(LinkDiv)`
    grid-area: title;
`;

const ServiceTitle = styled(Title)`
    @media (max-width: 900px) {
        margin: 0;
    }
`;

const DetailsArea = styled.div`
    grid-area: details;

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

        /* @media (max-width: 900px) {
            --size: 1.2rem;
        } */

        @media (max-width: 550px) {
            --size: 1rem;
        }
    }
`;

const MediaArea = styled(LinkDiv)`
    aspect-ratio: 16 / 9;
    grid-area: media;

    > a {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 900px) {
        aspect-ratio: 0;
        height: 100%;
    }
`;

const ButtonArea = styled.div`
    grid-area: button;
`;

const ServicesButton = styled(Button)`
    font-size: 2rem;

    @media (max-width: 550px) {
        font-size: 1.5rem;
    }
`;

type ServiceBlockProps = {
    title: string;
    slug: string;
    offerings: string[];
    slideshow: MediaCollection;
    align?: HorizontalDirection;
    youtube?: string;
    buttonImages: MediaCollection;
};

const ServiceBlock = ({
    title,
    slug,
    offerings,
    align = "left",
    slideshow,
    buttonImages,
    youtube,
}: ServiceBlockProps) => {
    return (
        <ServiceWrapper $align={align}>
            <TitleArea to={`/services/${slug}`}>
                <ServiceTitle content={title.toLowerCase()} />
            </TitleArea>

            <DetailsArea>
                <p>
                    <b>/services</b>
                </p>
                {offerings.map((offering, idx) => (
                    <p key={idx}>{offering}</p>
                ))}
            </DetailsArea>

            <MediaArea to={`/services/${slug}`}>
                <Slideshow
                    src={slideshow.items}
                    resizeMode="cover"
                    aspectRatio={16 / 9}
                />
            </MediaArea>

            <ButtonArea>
                <ServicesButton
                    to={slug}
                    type="carousel"
                    direction={invertHorizontal(align)}
                    inverted={false}
                    images={buttonImages.items}
                >
                    Learn More
                </ServicesButton>
            </ButtonArea>
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
                        slug={service.slug}
                        slideshow={service.slideshow}
                        buttonImages={service.buttonImages}
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
