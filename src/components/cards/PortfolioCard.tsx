import classnames from "classnames";
import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

import useContainerQuery from "../../global/containerQuery";
import { DarkTheme } from "../../global/themes";

import PortfolioItem from "../../types/PortfolioItem";
import { Heading2, Tags } from "../Typography";
import Media from "../media/Media";
import Overlay from "./utils/Overlay";

type PortfolioCardProps = {
    item: PortfolioItem;
};

const StyledCard = styled(Link)`
    position: relative;
    display: block;

    width: 100%;
    height: 100%;

    &.small {
        ${Heading2} {
            font-size: 2rem;
        }

        ${Tags} {
            font-size: 1rem;
        }
    }

    ${Heading2} {
        position: absolute;
        color: ${DarkTheme.color};
        bottom: 0.5rem;
        left: 0.5rem;
        z-index: 10;
        font-size: 3rem;
        width: calc(100% - 1rem);

        text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    }

    ${Tags} {
        position: absolute;
        color: ${DarkTheme.color};
        top: 0.5rem;
        right: 0.5rem;
        text-align: right;
        z-index: 10;
        font-size: 1.2rem;

        text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    }

    ${Overlay} {
        opacity: 0.2;
        transition: opacity 0.1s ease-in-out;
    }

    .media-wrapper {
        width: 100%;
        height: 100%;
        transform: scale(1);
        transition: transform 0.1s ease-in-out;
        filter: blur(2px);
    }

    &:hover {
        ${Overlay} {
            opacity: 0;
        }

        .media-wrapper {
            transform: scale(1.05);
        }
    }
`;

export function PortfolioCard({ item }: PortfolioCardProps) {
    const [matches, ref] = useContainerQuery<HTMLDivElement>({
        small: {
            max: 350,
        },
    });

    return (
        <StyledCard
            to={`/portfolio/${item.slug}`}
            className={classnames(matches)}
        >
            <Media src={item.thumbnail} />

            {/* stupid typescript weirdness with putting ref on styledcard. overlay is always the same width though */}
            <Overlay ref={ref} />

            <Heading2>{item.title}</Heading2>

            <Tags>
                {item.tags.map((tag, idx) => (
                    <>
                        <span key={idx}>{tag}</span>
                        <br />
                    </>
                ))}
            </Tags>
        </StyledCard>
    );
}
