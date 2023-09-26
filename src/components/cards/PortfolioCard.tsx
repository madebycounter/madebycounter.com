import classnames from "classnames";
import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

import useContainerQuery from "../../global/containerQuery";

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

    ${Heading2} {
        position: absolute;
        color: ${(props) => props.theme.backgroundColor};
        bottom: 0.5rem;
        left: 0.5rem;
        z-index: 10;
        font-size: 3rem;
        width: calc(100% - 1rem);

        text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    }

    ${Tags} {
        position: absolute;
        color: ${(props) => props.theme.backgroundColor};
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
    return (
        <StyledCard to={`/portfolio/${item.slug}`}>
            <Media src={item.thumbnail} aspectRatio={4 / 3} />

            <Overlay />

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
