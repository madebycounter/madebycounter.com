import React from "react";
import styled from "styled-components";

import Asset from "../../types/Asset";
import PortfolioItem from "../../types/PortfolioItem";
import MarkupSwap from "../MobileSwap";
import Media from "../media/Media";
import Slideshow from "../media/Slideshow";
import Pitch, { PitchButton } from "./Pitch";
import Segment, { Bio, Spacer } from "./Segment";
import { BioParagraph, BioParagraphMobile, Nametag } from "./Typography";

type LukeProps = {
    portfolioItems: PortfolioItem[];
    portrait: Asset;
    signature: Asset;
    slideshow1: Asset[];
    slideshow2: Asset[];
};

const LukeBio = styled(Bio)``;

const Signature = styled.div`
    position: absolute;
    filter: ${({ theme }) => theme.imageFilter};

    width: 190px;
    top: 320px;
    left: 369px;

    @media (max-width: 850px) {
        width: 24vw;
        top: 72vw;
        left: 28vw;
    }
`;

const Portrait = styled.div`
    position: absolute;
    width: 255px;

    top: -50px;
    left: 540px;
    z-index: 1000;

    @media (max-width: 850px) {
        width: 45vw;
        top: 26vw;
        left: 47vw;
    }
`;

const SlideshowContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    width: calc(290px * 2 + 1rem);

    @media (max-width: 850px) {
        margin-top: 5vw;
        flex-direction: column;
        width: 50vw;
        gap: 2vw;
    }
`;

export default function Luke({
    portfolioItems,
    portrait,
    signature,
    slideshow1,
    slideshow2,
}: LukeProps) {
    return (
        <Segment>
            <Pitch
                portfolioItems={portfolioItems}
                affirmation={
                    <>
                        We make
                        <br />
                        business
                        <br />
                        happen.
                    </>
                }
                button={<PitchButton to="#">Learn More</PitchButton>}
            />

            <LukeBio>
                <div>
                    <Nametag>
                        luke a.
                        <br />
                        makinson
                    </Nametag>

                    <MarkupSwap width={850}>
                        <BioParagraph>
                            Hey, Luke here! Look, I like
                            <br />
                            making cool stuff just like you.
                            <br />
                            Let's show off your brand
                            <br />
                            with the quality video
                            <br />
                            it deserves.
                        </BioParagraph>

                        <BioParagraphMobile>
                            Hey, Luke here!
                            <br />
                            Look, I like making
                            <br />
                            cool stuff just like
                            <br />
                            you. Let's show off
                            <br />
                            your brand with the
                            <br />
                            quality video
                            <br />
                            it deserves.
                        </BioParagraphMobile>
                    </MarkupSwap>

                    <SlideshowContainer>
                        <Slideshow src={slideshow1} aspectRatio={16 / 9} />
                        <Slideshow src={slideshow2} aspectRatio={16 / 9} />
                    </SlideshowContainer>
                </div>

                <MarkupSwap width={850}>
                    <Spacer $width={170} />
                </MarkupSwap>

                <Signature>
                    <Media src={signature} />
                </Signature>

                <Portrait>
                    <Media src={portrait} />
                </Portrait>
            </LukeBio>
        </Segment>
    );
}
