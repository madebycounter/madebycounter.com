import React from "react";
import styled from "styled-components";

import Asset from "../../types/Asset";
import PortfolioItem from "../../types/PortfolioItem";
import Media from "../media/Media";
import Slideshow from "../media/Slideshow";
import Pitch, { PitchButton } from "./Pitch";
import Segment from "./Segment";
import { BioParagraph, Nametag } from "./Typography";

type LukeProps = {
    portfolioItems: PortfolioItem[];
    portrait: Asset;
    signature: Asset;
    slideshow1: Asset[];
    slideshow2: Asset[];
};

const Bio = styled.div`
    position: relative;
    margin-right: 170px;
`;

const Signature = styled.div`
    position: absolute;
    width: 190px;

    top: 320px;
    left: 369px;

    filter: ${({ theme }) => theme.imageFilter};
`;

const Portrait = styled.div`
    position: absolute;
    width: 255px;

    top: -50px;
    left: 540px;
    z-index: 1000;
`;

const SlideshowContainer = styled.div`
    display: flex;
    gap: 1rem;
    width: calc(290px * 2 + 1rem);
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

            <Bio>
                <Nametag>
                    luke a.
                    <br />
                    makinson
                </Nametag>

                <BioParagraph>
                    Hey, Luke here! Look, I like
                    <br />
                    making cool stuff just luke you.
                    <br />
                    Let's show off your brand
                    <br />
                    with the quality video
                    <br />
                    it deserves.
                </BioParagraph>

                <SlideshowContainer>
                    <Slideshow src={slideshow1} aspectRatio={16 / 9} />
                    <Slideshow src={slideshow2} aspectRatio={16 / 9} />
                </SlideshowContainer>

                <Signature>
                    <Media src={signature} />
                </Signature>

                <Portrait>
                    <Media src={portrait} />
                </Portrait>
            </Bio>
        </Segment>
    );
}
