import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";

import HenryPointing from "../../images/authors/henry-point.webp";
import LukePointing from "../../images/authors/luke-point.webp";
import WilliamPointing from "../../images/authors/william-point.webp";

import { TeamMember } from "../../types";
import Asset from "../../types/Asset";
import Arrow from "../Arrow";
import { ProfilePhoto } from "../Author";
import Button from "../Button";
import MarkupSwap from "../MobileSwap";
import { Paragraph } from "../Typography";

const PointingImage = styled.img`
    width: 100%;
`;

function getPointingImage(author: TeamMember) {
    switch (author) {
        case "Henry":
            return HenryPointing;
        case "Luke":
            return LukePointing;
        case "William":
            return WilliamPointing;
    }
}

const FunFactWrapper = styled.div`
    display: grid;
    grid-row-gap: 0.5rem;
    grid-column-gap: 2rem;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas: "portrait fact" "portrait button";
    max-width: 900px;
    margin: auto;
    padding: 1rem 1rem;

    @media (max-width: 600px) {
        padding: 1rem 0;
    }
`;

const PortraitWrapper = styled.div`
    grid-area: portrait;
    display: flex;
    width: 200px;

    align-items: flex-end;
    padding-bottom: 0.1rem;

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
            font-size: 1.1rem;
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
    fact: string;
    author: TeamMember;
    cta: string;
    carousel: Asset[];
};

export default function FunFact({ fact, author, cta, carousel }: FunFactProps) {
    return (
        <FunFactWrapper>
            <PortraitWrapper>
                <MarkupSwap width={600}>
                    <ProfilePhoto member={author} cropped={true} />

                    <PointingImage src={getPointingImage(author)} alt="" />
                </MarkupSwap>
            </PortraitWrapper>

            <FactWrapper>
                <Paragraph>“{fact}”</Paragraph>

                <FunFactArrow $direction="left" />
            </FactWrapper>

            <ButtonWrapper>
                <FunFactButton
                    to="#"
                    inverted={true}
                    images={carousel}
                    direction="right"
                    type="carousel"
                >
                    {cta}
                </FunFactButton>
            </ButtonWrapper>
        </FunFactWrapper>
    );
}
