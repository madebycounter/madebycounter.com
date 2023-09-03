import React from "react";
import styled from "styled-components";

import { smartShorten } from "../../global/textHelpers";

import PortfolioItem from "../../types/PortfolioItem";
import Details from "../PortfolioDetails";
import { Heading2, Paragraph } from "../Typography";
import Slideshow from "../media/Slideshow";

type PortfolioCardProps = {
    item: PortfolioItem;
};

const StyledPortfolioCard = styled.div`
    margin: 2rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;

    aspect-ratio: 8 / 3;

    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};

    ${Heading2} {
        margin: 0.5rem;
    }

    ${Paragraph} {
        font-size: 1.2rem;
    }

    box-shadow: 3px 3px 13px 0px rgba(0, 0, 0, 0.15);
`;

const PortfolioCardSlash = styled.div`
    position: absolute;
    left: 50%;
    height: 100%;
    aspect-ratio: 400 / 1650;

    background-color: ${(props) => props.theme.backgroundColor};
    z-index: 10;

    clip-path: polygon(0% 0%, 0% 100%, 50% 50%, 100% 0%);
`;

export function PortfolioCard({ item }: PortfolioCardProps) {
    return (
        <StyledPortfolioCard>
            <PortfolioCardSlash />

            <div>
                <Heading2>{item.title}</Heading2>

                <Details
                    date={item.date}
                    tags={item.tags}
                    plainText={smartShorten(
                        item.description,
                        item.title.length > 19 ? 140 : 180,
                    )}
                />
            </div>

            <Slideshow
                src={item.gallery || [item.thumbnail]}
                aspectRatio={4 / 3}
                autoplayDelay={2000}
            />
        </StyledPortfolioCard>
    );
}
