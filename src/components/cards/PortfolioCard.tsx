import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

import PortfolioItem from "../../types/PortfolioItem";
import { Heading2, Tags } from "../Typography";
import Media from "../media/Media";

type PortfolioCardProps = {
    item: PortfolioItem;
};

const StyledCardOverlay = styled.div`
    position: absolute;
    z-index: 5;

    height: 100%;
    width: 100%;
    top: 0;
    left: 0;

    /* background: linear-gradient(black -20%, transparent 50%, black 120%); */
    background: black;
`;

const StyledCard = styled(Link)`
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

    ${StyledCardOverlay} {
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
        ${StyledCardOverlay} {
            opacity: 0;
        }

        img {
            transform: scale(1.05);
        }
    }
`;

export function PortfolioCard({ item }: PortfolioCardProps) {
    return (
        <StyledCard to={`/portfolio/${item.slug}`}>
            <Media src={item.thumbnail} aspectRatio={4 / 3} />

            <StyledCardOverlay />

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
