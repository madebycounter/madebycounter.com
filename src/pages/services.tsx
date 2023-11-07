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
import Slideshow from "../components/media/Slideshow";
import YouTube from "../components/media/YouTube";

import { HorizontalDirection } from "../types";
import Asset from "../types/Asset";
import { useServicesPage } from "../types/pages/ServicesPage";

function directionToButtonType(direction: HorizontalDirection): ButtonType {
    switch (direction) {
        case "left":
            return "right";
        case "right":
            return "left";
    }
}

const ServiceWrapper = styled.div<{ $align: HorizontalDirection }>`
    display: grid;
    grid-template-rows: auto 1fr auto;
    column-gap: 1rem;

    ${(props) => {
        switch (props.$align) {
            case "left":
                return css`
                    grid-template-areas: "title title" "media details" "media button";
                    grid-template-columns: 2fr 1fr;
                    text-align: left;
                `;
            case "right":
                return css`
                    grid-template-areas: "title title" "details media" "button media";
                    grid-template-columns: 1fr 2fr;
                    text-align: right;
                `;
        }
    }}
`;

const TitleArea = styled.div`
    grid-area: title;
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
    }
`;

const MediaArea = styled.div`
    grid-area: media;
`;

const ButtonArea = styled.div`
    grid-area: button;
`;

const ServicesButton = styled(Button)`
    font-size: 2rem;
`;

type ServiceBlockProps = {
    title: string;
    slug: string;
    offerings: string[];
    align?: HorizontalDirection;
    slideshow?: Asset[];
    youtube?: string;
};

const ServiceBlock = ({
    title,
    slug,
    offerings,
    align = "left",
    slideshow,
    youtube,
}: ServiceBlockProps) => {
    var buttonImages: Asset[] = [];
    if (slideshow && slideshow.length > 0) {
        buttonImages = slideshow;
    }

    return (
        <ServiceWrapper $align={align}>
            <TitleArea>
                <Title content={title.toLowerCase()} />
            </TitleArea>

            <DetailsArea>
                <p>
                    <b>/services</b>
                </p>
                {offerings.map((offering, idx) => (
                    <p key={idx}>{offering}</p>
                ))}
            </DetailsArea>

            <MediaArea>
                {slideshow && (
                    <Slideshow src={slideshow} aspectRatio={16 / 9} />
                )}

                {youtube && <YouTube url={youtube} aspectRatio={16 / 9} />}
            </MediaArea>

            <ButtonArea>
                <ServicesButton
                    to={slug}
                    type={directionToButtonType(align)}
                    inverted={false}
                    images={buttonImages}
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
