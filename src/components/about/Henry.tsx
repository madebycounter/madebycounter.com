import { sign } from "crypto";
import React from "react";
import styled from "styled-components";

import Asset from "../../types/Asset";
import PortfolioItem from "../../types/PortfolioItem";
import MarkupSwap from "../MobileSwap";
import Media from "../media/Media";
import Slideshow from "../media/Slideshow";
import Pitch, { PitchButton } from "./Pitch";
import Segment, { Bio, Spacer } from "./Segment";
import {
    BioParagraph,
    BioParagraphMobile,
    DippedNametag,
    Nametag,
} from "./Typography";

type HenryProps = {
    portfolioItems: PortfolioItem[];
    portrait: Asset;
    signature: Asset;
    slideshow1: Asset[];
    slideshow2: Asset[];
    buttonCarousel: Asset[];
};

const HenryBio = styled(Bio)`
    align-items: flex-end;
    gap: 1rem;

    @media (max-width: 850px) {
        flex-direction: column-reverse;
        align-items: flex-start;
    }
`;

const Signature = styled.div`
    width: 335px;
    filter: ${({ theme }) => theme.imageFilter};

    @media (max-width: 850px) {
        width: 50vw;
    }
`;

const Portrait = styled.div`
    position: absolute;
    transform: scaleX(-1);
    width: 280px;

    top: 0px;
    left: -20px;
    z-index: 1000;

    @media (max-width: 850px) {
        width: 51vw;
        top: -21vw;
        left: 41vw;

        transform: none;
    }
`;

const SlideshowContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 250px;
    gap: 0.5rem;

    @media (max-width: 850px) {
        /* 4vw margin, 2vw gap */
        --m: 4vw;
        --g: 2vw;

        --width1: 53vw;
        --width2: calc(100vw - var(--width1) - var(--m) * 2 - var(--g));

        width: var(--width1);

        > :first-child {
            position: absolute;

            width: var(--width2);
            height: calc(var(--width2) * 4 / 3);

            bottom: 0;
            left: calc(var(--g) + var(--width1));
        }
    }
`;

const InfoContainer = styled.div``;

export default function Henry({
    portfolioItems,
    portrait,
    signature,
    slideshow1,
    slideshow2,
    buttonCarousel,
}: HenryProps) {
    return (
        <Segment direction="left">
            <Pitch
                direction="left"
                portfolioItems={portfolioItems}
                affirmation={
                    <>
                        Our pics
                        <br />
                        increase
                        <br />
                        sales.
                    </>
                }
                button={
                    <PitchButton
                        to="#"
                        type="carousel"
                        direction="left"
                        images={buttonCarousel}
                    >
                        Learn More
                    </PitchButton>
                }
            />

            <HenryBio>
                <MarkupSwap width={850}>
                    <Spacer $width={140} />
                </MarkupSwap>

                <SlideshowContainer>
                    <Slideshow src={slideshow2} aspectRatio={3 / 4} />
                    <Slideshow src={slideshow1} aspectRatio={4096 / 2160} />
                </SlideshowContainer>

                <InfoContainer>
                    <DippedNametag>
                        henry
                        <br />
                        j. buck
                    </DippedNametag>

                    <MarkupSwap width={850}>
                        <BioParagraph>
                            Hi, I'm Henry! Your
                            <br />
                            hard work deserves
                            <br />
                            a strong social media
                            <br />
                            presence. Let's build
                            <br />
                            your following with
                            <br />
                            quality photography
                            <br />
                            and graphic design.
                        </BioParagraph>

                        <BioParagraphMobile>
                            Hi, I'm Henry! Your
                            <br />
                            hard work deserves
                            <br />
                            a strong social media
                            <br />
                            presence. Let's build
                            <br />
                            your following with
                            <br />
                            quality photography
                            <br />
                            and graphic design.
                        </BioParagraphMobile>
                    </MarkupSwap>

                    <Signature>
                        <Media src={signature} />
                    </Signature>
                </InfoContainer>

                <Portrait>
                    <Media src={portrait} />
                </Portrait>
            </HenryBio>
        </Segment>
    );
}
