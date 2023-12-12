import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import styled from "styled-components";

import { portfolioOptions } from "../../global/richTextOptions";

import FunFact from "../../types/components/FunFact";

import { packRichText } from "../../types/RichText";
import Arrow from "../Arrow";
import { ProfilePhoto } from "../Author";
import Button from "../Button";
import MarkupSwap from "../MobileSwap";
import { Paragraph } from "../Typography";
import Media from "../media/Media";

const FunFactMarkupSwap = styled(MarkupSwap)`
    width: 100%;
`;

const FunFactWrapper = styled.div`
    display: grid;
    grid-row-gap: 0.5rem;
    grid-column-gap: 2rem;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: "portrait fact" "portrait button";

    @media (max-width: calc(900px + 2rem)) {
        margin: 1rem;
    }

    @media (max-width: 600px) {
        margin: 0;
    }
`;

const PortraitWrapper = styled.div`
    grid-area: portrait;
    display: flex;
    width: 200px;

    align-items: flex-end;
    padding-bottom: 0.1rem;

    z-index: 10;

    // Mobile view
    @media (max-width: 600px) {
        width: 80px;
        align-items: flex-start;
    }
`;

const FactWrapper = styled.div`
    position: relative;
    grid-area: fact;
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.backgroundColor};

    padding: 0.5rem 2rem;

    display: flex;
    justify-content: center;
    align-items: center;

    ${Paragraph} {
        font-size: 1.7rem;
        line-height: 1.2em;
        margin: 0;
    }

    @media (max-width: 670px) {
        padding: 0.5rem 1rem;

        ${Paragraph} {
            font-size: 1.4rem;
        }
    }

    // Mobile view
    @media (max-width: 600px) {
        padding: 0.5rem 0rem;

        ${Paragraph} {
            font-size: 1.2rem;
        }
    }
`;

const ButtonWrapper = styled.div`
    grid-area: button;
`;

const FunFactArrow = styled(Arrow)`
    position: absolute;
    height: 100%;
    top: 0;
    right: 100%;
`;

const FunFactButton = styled(Button)`
    font-size: 2.5rem;

    // Mobile view
    @media (max-width: 600px) {
        font-size: 1.6rem;
    }
`;

type FunFactProps = {
    fact: FunFact;
};

export default function FunFactCard({ fact }: FunFactProps) {
    return (
        <FunFactWrapper>
            <PortraitWrapper>
                <FunFactMarkupSwap width={600}>
                    <ProfilePhoto teamMember={fact.teamMember} />

                    <Media src={fact.teamMember.pointingPhoto} />
                </FunFactMarkupSwap>
            </PortraitWrapper>

            <FactWrapper>
                <Paragraph>
                    "
                    {renderRichText(
                        packRichText(fact.content),
                        portfolioOptions,
                    )}
                    "
                </Paragraph>

                <FunFactArrow $direction="left" />
            </FactWrapper>

            <ButtonWrapper>
                <FunFactButton
                    to="#"
                    inverted={true}
                    images={fact.buttonImages.items}
                    direction="right"
                    type="carousel"
                >
                    {fact.buttonText}
                </FunFactButton>
            </ButtonWrapper>
        </FunFactWrapper>
    );
}
