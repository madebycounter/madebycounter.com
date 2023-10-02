import React from "react";
import { styled } from "styled-components";

import { HorizontalDirection } from "../../types";
import PortfolioItem from "../../types/PortfolioItem";
import { Heading1 } from "../Typography";
import { PortfolioCard } from "../cards/PortfolioCard";

const PitchWrapper = styled.div`
    background-color: ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.backgroundColor};
`;

const CardContainer = styled.div`
    width: 400px;
    height: 211px;
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
`;

const Affirmation = styled(Heading1)<{ $direction: HorizontalDirection }>`
    font-size: 8.375rem;
    line-height: 0.8em;
    padding-bottom: 0.1em;
    text-align: ${({ $direction }) =>
        $direction === "left" ? "right" : "left"};
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
