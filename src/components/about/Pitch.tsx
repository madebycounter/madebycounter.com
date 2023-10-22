import React from "react";
import { css, styled } from "styled-components";

import { HorizontalDirection } from "../../types";
import PortfolioItem from "../../types/PortfolioItem";
import Button, { ButtonWrapper } from "../Button";
import { Heading1 } from "../Typography";
import { PortfolioCard } from "../cards/PortfolioCard";

export const PitchButton = styled(Button)`
    font-size: 4rem;

    // Desktop reduced
    @media (max-width: 1660px) {
        font-size: 3rem;
    }
`;

const PitchWrapper = styled.div<{ $direction: HorizontalDirection }>`
    background-color: ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.backgroundColor};
    width: calc(400px * 2 + 3rem);
    display: grid;

    grid-template-rows: auto 1fr auto;
    grid-template-areas: "portfolio" "affirmation" "button";

    // Desktop reduced
    @media (max-width: 1660px) {
        width: calc(400px + 2rem);
    }

    // Tablet
    @media (max-width: 1250px) {
        width: 100%;

        ${(props) => {
            switch (props.$direction) {
                case "right":
                    return css`
                        grid-template-rows: 1fr auto;
                        grid-template-columns: auto 1fr;
                        grid-template-areas: "portfolio affirmation" "portfolio button";
                    `;
                case "left":
                    return css`
                        grid-template-rows: 1fr auto;
                        grid-template-columns: 1fr auto;
                        grid-template-areas: "affirmation portfolio" "button portfolio";
                    `;
            }
        }}
    }

    // Mobile
    @media (max-width: 600px) {
        grid-template-rows: auto auto auto;
        grid-template-columns: auto;
        grid-template-areas: "portfolio" "affirmation" "button";
    }
`;

const CardContainer = styled.div`
    width: 400px;
    aspect-ratio: 4096 / 2160;

    display: block;

    // Tablet
    @media (max-width: 1250px) {
        width: 100%;
        width: 40vw;
    }

    // Mobile
    @media (max-width: 600px) {
        width: 100%;
    }
`;

const PortfolioItems = styled.div`
    grid-area: portfolio;
    margin: 1rem;
    display: flex;
    gap: 1rem;

    // Desktop reduced
    @media (max-width: 1660px) {
        > div:not(:first-child) {
            display: none;
        }
    }

    // Tablet
    @media (max-width: 1250px) {
        flex-direction: column;

        > div:not(:first-child) {
            display: block;
        }
    }

    // Mobile
    @media (max-width: 600px) {
        > div:not(:first-child) {
            display: none;
        }
    }
`;

const Affirmation = styled(Heading1)<{ $direction: HorizontalDirection }>`
    margin: 1rem;
    grid-area: affirmation;
    font-size: 8.375rem;
    line-height: 0.8em;
    padding-bottom: 0.1em;
    text-align: ${({ $direction }) =>
        $direction === "left" ? "right" : "left"};

    // Desktop reduced
    @media (max-width: 1660px) {
        font-size: 5.5rem;
        margin-top: 0;
    }

    // Tablet
    @media (max-width: 1250px) {
        margin: 1rem 0;
        font-size: 12vw;
        margin-top: 1rem;
    }

    // Mobile
    @media (max-width: 600px) {
        margin: 1rem;
        font-size: 5.5rem;
        margin-top: 0;
    }

    // Mobile reduced
    @media (max-width: 400px) {
        font-size: 4rem;
    }
`;

const ButtonArea = styled.div`
    grid-area: button;

    // Tablet
    @media (max-width: 1250px) {
        margin-bottom: 1rem;
    }

    // Mobile
    @media (max-width: 600px) {
        margin-bottom: 0;
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
        <PitchWrapper $direction={direction}>
            <PortfolioItems>
                {portfolioItems.map((item, idx) => (
                    <CardContainer key={idx}>
                        <PortfolioCard item={item} />
                    </CardContainer>
                ))}
            </PortfolioItems>

            <Affirmation $direction={direction}>{affirmation}</Affirmation>

            <ButtonArea>{button}</ButtonArea>
        </PitchWrapper>
    );
}
