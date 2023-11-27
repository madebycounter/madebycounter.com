import React from "react";
import { styled } from "styled-components";

import { usePortfolioItems } from "../../types/PortfolioItem";
import Button from "../Button";
import Highlight from "../Highlight";
import { Heading1, Paragraph } from "../Typography";
import ImageGrid from "./ImageGrid";

const StyledHeading = styled(Heading1)`
    font-size: 7vw;

    @media (max-width: 1000px) {
        font-size: 12vw;
    }
`;

const StyledParagraph = styled(Paragraph)`
    font-size: 1.8rem;
    max-width: 70%;

    @media (max-width: 1500px) {
        max-width: 100%;
    }

    @media (max-width: 1000px) {
        font-size: 5.2vw;
    }
`;

const StyledButton = styled(Button)`
    font-size: 3rem;
`;

const InfoBox = styled.div`
    --p: 2rem;
    flex: 1;
    padding: var(--p);
    width: calc(100% - (var(--p) * 2));

    @media (max-width: 1000px) {
        --p: 1rem;
    }
`;

const GridBox = styled.div`
    flex: 1;
`;

const HeroWrapper = styled.div`
    display: flex;

    @media (max-width: 1000px) {
        flex-direction: column-reverse;
    }

    width: 100%;
`;

export function Hero() {
    const portfolioItems = usePortfolioItems();
    const images = portfolioItems.map((item) => item.gallery || []);

    return (
        <HeroWrapper>
            <InfoBox>
                <StyledHeading>
                    We make cool
                    <br />
                    stuff, <Highlight>see?</Highlight>
                </StyledHeading>

                <StyledParagraph>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Accusantium assumenda voluptate est nemo nulla aliquam.
                    Maxime neque dolore fugiat illo amet, natus blanditiis
                    ratione nisi unde provident voluptatum reiciendis
                    accusantium!
                </StyledParagraph>

                <StyledButton to="">Learn More</StyledButton>
            </InfoBox>

            <GridBox>
                <ImageGrid
                    column1={images[0]}
                    column2={images[4]}
                    column3={images[2]}
                    row={images[5]}
                />
            </GridBox>
        </HeroWrapper>
    );
}
