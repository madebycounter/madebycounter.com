import React from "react";
import { styled } from "styled-components";

import { HorizontalDirection } from "../../types";
import PortfolioItem from "../../types/PortfolioItem";
import Button from "../Button";
import { Heading1 } from "../Typography";
import { PortfolioCard } from "../cards/PortfolioCard";

export const PitchButton = styled(Button)`
    font-size: 4rem;

    @media (max-width: 1660px) {
        font-size: 2.5rem;
    }
`;

const PitchWrapper = styled.div`
    background-color: ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.backgroundColor};
    width: calc(400px * 2 + 3rem);

    @media (max-width: 1660px) {
        width: calc(400px + 2rem);
    }
`;

const CardContainer = styled.div`
    width: 400px;
    height: 211px;
    display: block;
`;

const TopHalf = styled.div`
    margin: 1rem;
    gap: 1rem;
    display: flex;
    flex-direction: column;
`;

const PortfolioItems = styled.div`
    display: flex;
    gap: 1rem;

    @media (max-width: 1660px) {
        > div:not(:first-child) {
            display: none;
        }
    }
`;

const Affirmation = styled(Heading1)<{ $direction: HorizontalDirection }>`
    font-size: 8.375rem;
    line-height: 0.8em;
    padding-bottom: 0.1em;
    text-align: ${({ $direction }) =>
        $direction === "left" ? "right" : "left"};

    @media (max-width: 1660px) {
        font-size: 5.5rem;
    }
`;

type PitchProps = {
    portfolioItems: PortfolioItem[];
    affirmation: React.ReactNode;
    button: React.ReactNode;
    direction?: HorizontalDirection;
};

export default function Pitch({
    portfolioItems,
    affirmation,
    button,
    direction = "right",
}: PitchProps) {
    return (
        <PitchWrapper>
            <TopHalf>
                <PortfolioItems>
                    {portfolioItems.map((item, idx) => (
                        <CardContainer key={idx}>
                            <PortfolioCard item={item} />
                        </CardContainer>
                    ))}
                </PortfolioItems>

                <Affirmation $direction={direction}>{affirmation}</Affirmation>
            </TopHalf>

            {button}
        </PitchWrapper>
    );
}
