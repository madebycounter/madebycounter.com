import { BLOCKS, Block, Inline } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import styled, { css } from "styled-components";

import useSize, { useWindowSize } from "../../global/useSize";

import { packRichText } from "../../types/RichText";
import Service from "../../types/Service";
import Button from "../Button";
import { Heading1, Paragraph } from "../Typography";
import Media from "../media/Media";
import Slideshow from "../media/Slideshow";
import YouTube from "../media/YouTube";

const CtaButton = styled(Button)`
    font-size: 2rem;
    grid-area: button;

    @media (max-width: 400px) {
        font-size: 1.5rem;
    }
`;

const FullBodyImage = styled.div<{ $name: string }>`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    z-index: 100;

    @media (min-width: 1200px) {
        position: absolute;
        height: 120%;

        right: 0;
        top: 0;
    }

    ${(props) => {
        switch (props.$name) {
            case "Luke A. Makinson":
                return css`
                    transform: translate(8%, -10%);
                `;
            case "William Gardner":
                return css`
                    transform: translate(6%, -10%);
                `;
            case "Henry Buck":
                return css`
                    transform: translate(4%, -10%);
                `;
        }
    }}

    @media (max-width: 1200px) {
        position: relative;
        transform: translate(0, 0);
        grid-area: image;
    }

    @media (max-width: 600px) {
        display: none;

        ${(props) => {
            switch (props.$name) {
                case "Luke A. Makinson":
                    return css`
                        transform: scale(0.85) translateY(10%);
                    `;
                case "William Gardner":
                    return css`
                        transform: scale(1);
                    `;
                case "Henry Buck":
                    return css`
                        transform: scale(1);
                    `;
            }
        }}
    }
`;

const Ihatewritingcode = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;

    @media (max-width: 1200px) {
        display: block;
    }
`;

const DetailsWrapper = styled.div`
    grid-area: details;
    aspect-ratio: 4096 / 2160;
    position: relative;
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 100px;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: "heading image" "paragraph image" "button image";

    @media (max-width: 1200px) {
        grid-template-columns: 1fr 200px;
        grid-template-rows: auto auto 1fr;
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr auto;
        grid-template-areas: "heading heading" "paragraph image" "button image";
    }

    ${Heading1} {
        grid-area: heading;
        font-size: min(6vw, 6rem);

        @media (max-width: 1200px) {
            font-size: 9vw;
        }

        @media (max-width: 600px) {
            font-size: 12vw;
        }
    }

    ${Paragraph} {
        grid-area: paragraph;
        @media (max-width: 470px) {
            font-size: 1rem;
        }
    }
`;

export const pitchHeroOptions: any = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (
            node: Block | Inline,
            children: React.ReactNode,
        ) => {
            return <Paragraph>{children}</Paragraph>;
        },
        [BLOCKS.HEADING_1]: (
            node: Block | Inline,
            children: React.ReactNode,
        ) => {
            return <Heading1>{children}</Heading1>;
        },
    },
    renderText: (text: string): React.ReactNode => {
        return text.split("\n").map((text, i) => (
            <React.Fragment key={i}>
                {text}
                <br />
            </React.Fragment>
        ));
    },
};

function Details({
    service,
    onCtaClick,
}: {
    service: Service;
    onCtaClick?: () => void;
}) {
    const pageSize = useWindowSize();

    const rt = renderRichText(
        packRichText(service.pitchHero),
        pitchHeroOptions,
    );

    return (
        <DetailsWrapper>
            {rt}

            <CtaButton onClick={onCtaClick}>{service.callToAction}</CtaButton>

            <FullBodyImage $name={service.teamMember.fullName}>
                <Media
                    src={service.teamMember.fullBody}
                    resizeMode={"height"}
                    width={pageSize.width <= 600 ? 120 : undefined}
                />
            </FullBodyImage>
        </DetailsWrapper>
    );
}

const HeroWrapper = styled.div`
    max-width: 1600px;
    margin: 0 auto;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "details media";

    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-template-areas: "media" "details";
        max-width: 900px;
        gap: 1rem;
    }
`;

const MediaWrapper = styled.div`
    grid-area: media;

    @media (max-width: 1200px) {
        aspect-ratio: 4096 / 2160;
    }
`;

type HeroProps = {
    service: Service;
    onCtaClick?: () => void;
};

export default function Hero({ service, onCtaClick }: HeroProps) {
    return (
        <HeroWrapper>
            <Details onCtaClick={onCtaClick} service={service} />

            <MediaWrapper>
                {!service.youTube && (
                    <Slideshow
                        src={service.slideshow.items}
                        aspectRatio={4096 / 2160}
                        resizeMode="cover"
                    />
                )}

                {service.youTube && (
                    <YouTube url={service.youTube} aspectRatio={4096 / 2160} />
                )}
            </MediaWrapper>
        </HeroWrapper>
    );
}
