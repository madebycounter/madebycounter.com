import { BLOCKS, Block, Inline } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import styled from "styled-components";

import { portfolioOptions } from "../../global/richTextOptions";
import useSize from "../../global/useSize";

import { packRichText } from "../../types/RichText";
import Service from "../../types/Service";
import Button from "../Button";
import { Heading1, Paragraph } from "../Typography";
import Media from "../media/Media";
import Slideshow from "../media/Slideshow";
import YouTube from "../media/YouTube";

const CtaButton = styled(Button)`
    font-size: 2rem;
    grid-area: cta;
`;

const FullBodyImage = styled.div<{ $width: number }>`
    grid-area: image;
    height: 120%;
    transform: translateY(-10%);
    z-index: 10;

    width: ${(props) => props.$width}px;

    @media (max-width: 1200px) {
        height: 100%;
        transform: translateY(0);
    }
`;

const DetailsWrapper = styled.div<{ $cw: number }>`
    --cw: ${(props) => props.$cw}px;

    grid-area: details;
    aspect-ratio: 4096 / 2160;

    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto 130px;
    grid-template-areas: "heading image" "paragraph image" "cta image";

    @media (max-width: 1200px) {
        grid-template-columns: auto 1fr;
    }

    ${Heading1} {
        font-size: calc(var(--cw) * 12);
        grid-area: heading;
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

function Details({ service }: { service: Service }) {
    const [ref, size] = useSize<HTMLDivElement>();

    return (
        <DetailsWrapper ref={ref} $cw={size.width / 100}>
            {renderRichText(packRichText(service.pitchHero), pitchHeroOptions)}

            <CtaButton>{service.callToAction}</CtaButton>

            <FullBodyImage
                $width={
                    (service.teamMember.fullBody.dimensions.width /
                        service.teamMember.fullBody.dimensions.height) *
                    size.height
                }
            >
                <Media src={service.teamMember.fullBody} resizeMode="height" />
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
        grid-template-columns: auto;
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
};

export default function Hero({ service }: HeroProps) {
    return (
        <HeroWrapper>
            <Details service={service} />

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
