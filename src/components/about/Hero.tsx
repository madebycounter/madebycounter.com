import React from "react";
import { styled } from "styled-components";

import { usePortfolioItems } from "../../types/PortfolioItem";
import Button from "../Button";
import Highlight from "../Highlight";
import { Heading1, Paragraph } from "../Typography";
import ImageGrid from "./ImageGrid";

const StyledHeading = styled(Heading1)`
    font-size: 7vw;
`;

const StyledParagraph = styled(Paragraph)`
    font-size: 1.8rem;
    max-width: 70%;
`;

const StyledButton = styled(Button)`
    font-size: 3rem;
`;

const InfoBox = styled.div`
    flex: 1;
    padding: 2rem;
`;

const GridBox = styled.div`
    flex: 1;
    height: 800px;
`;

const HeroWrapper = styled.div`
    display: flex;
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
