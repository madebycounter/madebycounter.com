import { match } from "assert";
import classnames from "classnames";
import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

import useContainerQuery from "../../global/containerQuery";
import { smartShorten } from "../../global/textHelpers";

import PortfolioItem from "../../types/PortfolioItem";
import Details, { DetailsDescription } from "../PortfolioDetails";
import { Heading2, Paragraph, Tags } from "../Typography";
import Media from "../media/Media";
import Slideshow from "../media/Slideshow";
import LinkDiv from "./utils/LinkDiv";
import Slash from "./utils/Slash";

type PortfolioCardProps = {
    item: PortfolioItem;
};

const CardMediumOverlay = styled.div`
    position: absolute;
    z-index: 5;

    height: 100%;
    width: 100%;
    top: 0;
    left: 0;

    /* background: linear-gradient(black -20%, transparent 50%, black 120%); */
    background: black;
`;

const StyledCardMedium = styled(Link)`
    position: relative;
    display: block;

    ${Heading2} {
        position: absolute;
        color: ${(props) => props.theme.backgroundColor};
        bottom: 0.5rem;
        left: 0.5rem;
        z-index: 10;

        text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    }

    ${Tags} {
        position: absolute;
        color: ${(props) => props.theme.backgroundColor};
        top: 0.5rem;
        right: 0.5rem;
        text-align: right;
        z-index: 10;

        text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    }

    ${CardMediumOverlay} {
        opacity: 0.2;
        transition: opacity 0.2s ease-in-out;
    }

    img {
        transform: scale(1);

        /* opacity transition copied as to not override gatsby-image behaviour */
        /* could probably make a seperate div layer to do this but this is far easier lol */
        transition:
            transform 0.1s ease-in-out,
            opacity 0.25s linear !important;
    }

    &:hover {
        ${CardMediumOverlay} {
            opacity: 0;
        }

        img {
            transform: scale(1.05);
        }
    }
`;

export function PortfolioCardMedium({ item }: PortfolioCardProps) {
    return (
        <StyledCardMedium to={`/portfolio/${item.slug}`}>
            <Media src={item.thumbnail} aspectRatio={4 / 3} />

            <CardMediumOverlay />

            <Heading2>{item.title}</Heading2>

            <Tags>
                {item.tags.map((tag, idx) => (
                    <>
                        <span key={idx}>{tag}</span>
                        <br />
                    </>
                ))}
            </Tags>
        </StyledCardMedium>
    );
}

const StyledCardInfo = styled(LinkDiv)`
    ${Heading2} {
        margin: 0.5rem;
    }

    ${Paragraph} {
        font-size: 1.2rem;
        line-height: 1em;
    }
`;

const StyledCardSlideshow = styled(LinkDiv)`
    position: relative;
    height: 100%;
    width: 100%;
    aspect-ratio: 4 / 3;

    ${Slash} {
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
    }
`;

const StyledCard = styled.div`
    margin: 2rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;

    background-color: ${(props: any) => props.theme.backgroundColor};
    color: ${(props: any) => props.theme.color};

    box-shadow: 3px 3px 13px 0px rgba(0, 0, 0, 0.15);

    ${Tags} {
        margin: 0.5rem 0;
    }

    img {
        transform: scale(1);

        /* opacity transition copied as to not override gatsby-image behaviour */
        /* could probably make a seperate div layer to do this but this is far easier lol */
        transition:
            transform 0.1s ease-in-out,
            opacity 0.25s linear !important;
    }

    &:hover {
        img {
            transform: scale(1.08);
        }
    }

    &.small {
        grid-template-columns: 1fr 150px;

        ${DetailsDescription} {
            display: none;
        }

        ${Heading2} {
            font-size: 1.6rem;
        }

        ${StyledCardSlideshow} {
            aspect-ratio: auto;
        }
    }
`;

export function PortfolioCard({ item }: PortfolioCardProps) {
    const [matches, ref] = useContainerQuery<HTMLDivElement>({
        small: {
            max: 500,
        },
    });

    return (
        <StyledCard ref={ref} className={classnames(matches)}>
            <StyledCardInfo to={`/portfolio/${item.slug}`}>
                <Heading2>{item.title}</Heading2>

                <Details
                    tags={item.tags}
                    date={item.date}
                    plainText={smartShorten(
                        item.description,
                        item.title.length > 19 ? 140 : 180,
                    )}
                />
            </StyledCardInfo>

            <StyledCardSlideshow to={`/portfolio/${item.slug}`}>
                <Slash />

                <Slideshow
                    src={item.gallery || [item.thumbnail]}
                    autoplayDelay={2000}
                />
            </StyledCardSlideshow>
        </StyledCard>
    );
}
