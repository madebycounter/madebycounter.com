import { match } from "assert";
import classnames from "classnames";
import React from "react";
import styled from "styled-components";

import useContainerQuery from "../../global/containerQuery";
import {
    firstSentence,
    renderPlainText,
    smartShorten,
} from "../../global/textHelpers";

import PortfolioItem from "../../types/PortfolioItem";
import Details, {
    DetailsDescription,
    StyledDetails,
} from "../PortfolioDetails";
import { Heading2, Paragraph, Tags } from "../Typography";
import Slideshow from "../media/Slideshow";
import LinkDiv from "./utils/LinkDiv";
import Slash from "./utils/Slash";

const StyledEmbedInfo = styled(LinkDiv)`
    ${Heading2} {
        margin: 0.5rem;
    }

    ${Paragraph} {
        font-size: 1.2rem;
        line-height: 1em;
    }
`;

const StyledEmbedSlideshow = styled(LinkDiv)`
    position: relative;
    height: 100%;
    width: 100%;

    ${Slash} {
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
    }
`;

const StyledEmbed = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    background-color: ${(props: any) => props.theme.backgroundColor};
    color: ${(props: any) => props.theme.color};

    box-shadow: 3px 3px 13px 0px rgba(0, 0, 0, 0.15);

    ${Tags} {
        margin: 0.5rem 0;
    }

    .media-wrapper {
        transform: scale(1);
        transition: transform 0.1s ease-in-out;
    }

    &:hover {
        .media-wrapper {
            transform: scale(1.08);
        }
    }

    &.small {
        grid-template-columns: 2fr 1fr;

        ${DetailsDescription} {
            display: none;
        }

        ${Heading2} {
            font-size: 1.6rem;
        }

        ${StyledEmbedSlideshow} {
            aspect-ratio: auto;
        }
    }
`;

type PortfolioEmbedProps = {
    item: PortfolioItem;
};

export function PortfolioEmbed({ item }: PortfolioEmbedProps) {
    const [matches, ref] = useContainerQuery<HTMLDivElement>({
        small: {
            max: 450,
        },
        large: {
            min: 650,
        },
    });

    return (
        <StyledEmbed ref={ref} className={classnames(matches)}>
            <StyledEmbedInfo to={`/portfolio/${item.slug}`}>
                <Heading2>{item.title}</Heading2>

                <Details
                    tags={item.tags}
                    date={item.date}
                    plainText={
                        matches.indexOf("large") !== -1
                            ? renderPlainText(item.description)
                            : firstSentence(renderPlainText(item.description))
                    }
                />
            </StyledEmbedInfo>

            <StyledEmbedSlideshow to={`/portfolio/${item.slug}`}>
                <Slash />

                <Slideshow
                    src={item.gallery || [item.thumbnail]}
                    autoplayDelay={2000}
                />
            </StyledEmbedSlideshow>
        </StyledEmbed>
    );
}
