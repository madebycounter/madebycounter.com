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

type WilliamProps = {
    portfolioItems: PortfolioItem[];
    portrait: Asset;
    dronePortrait: Asset;
    signature: Asset;
    slideshow1: Asset[];
    slideshow2: Asset[];
    buttonCarousel: Asset[];
};

const WilliamBio = styled(Bio)``;

const SlideshowContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    width: calc(310px * 2 + 1rem);

    @media (max-width: 850px) {
        padding-top: 5vw;
        gap: 2vw;
        width: calc(100vw - 8vw);
    }
`;

const Signature = styled.div`
    position: absolute;
    width: 146px;

    top: 362px;
    left: 394px;

    filter: ${({ theme }) => theme.imageFilter};

    @media (max-width: 850px) {
        width: 25vw;
        top: 72vw;
        left: 39vw;
    }
`;

const Portrait = styled.div`
    position: absolute;
    width: 250px;

    top: 0px;
    left: 520px;
    z-index: 1000;

    @media (max-width: 850px) {
        width: 40vw;
        top: -6vw;
        left: 52vw;
    }
`;

const DronePortrait = styled.div`
    position: absolute;
    width: 215px;

    top: -190px;
    left: 467px;
    z-index: 1000;

    @media (max-width: 850px) {
        width: 31vw;
        top: -31vw;
        left: 55vw;
    }
`;

export default function William({
    portfolioItems,
    portrait,
    dronePortrait,
    signature,
    slideshow1,
    slideshow2,
    buttonCarousel,
}: WilliamProps) {
    return (
        <Segment>
            <Pitch
                portfolioItems={portfolioItems}
                affirmation={
                    <>
                        Drones
                        <br />
                        make you
                        <br />
                        stand out.
                    </>
                }
                button={
                    <PitchButton to="#" images={buttonCarousel}>
                        Learn More
                    </PitchButton>
                }
            />

            <WilliamBio>
                <div>
                    <MarkupSwap width={850}>
                        <div>
                            <DippedNametag>
                                william
                                <br />
                                d. gardner
                            </DippedNametag>

                            <BioParagraph>
                                Hello, I'm William. Stunning aerial
                                <br />
                                footage makes your business stand
                                <br />
                                out. We remove the hurdles and
                                <br />
                                put drones to work
                                <br />
                                for you!
                            </BioParagraph>
                        </div>

                        <div>
                            <DippedNametag>
                                william d.
                                <br />
                                gardner
                            </DippedNametag>

                            <BioParagraphMobile>
                                Hello, I'm William.
                                <br />
                                Stunning aerial footage
                                <br />
                                makes your business
                                <br />
                                stand out. We remove
                                <br />
                                the hurdles and put
                                <br />
                                drones to work
                                <br />
                                for you!
                            </BioParagraphMobile>
                        </div>
                    </MarkupSwap>

                    <SlideshowContainer>
                        <Slideshow src={slideshow1} aspectRatio={16 / 9} />
                        <Slideshow src={slideshow2} aspectRatio={16 / 9} />
                    </SlideshowContainer>
                </div>

                <Spacer $width={110} />

                <Signature>
                    <Media src={signature} />
                </Signature>

                <Portrait>
                    <Media src={portrait} />
                </Portrait>

                <DronePortrait>
                    <Media src={dronePortrait} />
                </DronePortrait>
            </WilliamBio>
        </Segment>
    );
}
