import { sign } from "crypto";
import React from "react";
import styled from "styled-components";

import Asset from "../../types/Asset";
import PortfolioItem from "../../types/PortfolioItem";
import Media from "../media/Media";
import Slideshow from "../media/Slideshow";
import Pitch, { PitchButton } from "./Pitch";
import Segment from "./Segment";
import { BioParagraph, DippedNametag, Nametag } from "./Typography";

type HenryProps = {
    portfolioItems: PortfolioItem[];
    portrait: Asset;
    signature: Asset;
    slideshow1: Asset[];
    slideshow2: Asset[];
};

const Bio = styled.div`
    display: flex;
`;

const Signature = styled.div`
    width: 335px;
    filter: ${({ theme }) => theme.imageFilter};
`;

const SlideshowContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    gap: 1rem;
`;

const InfoContainer = styled.div``;

export default function Henry({
    portfolioItems,
    portrait,
    signature,
    slideshow1,
    slideshow2,
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
                    <PitchButton to="#" direction="left">
                        Learn More
                    </PitchButton>
                }
            />

            <Bio>
                <SlideshowContainer>
                    <Slideshow src={slideshow2} aspectRatio={2 / 3} />
                    <Slideshow src={slideshow1} aspectRatio={16 / 9} />
                </SlideshowContainer>

                <InfoContainer>
                    <DippedNametag>
                        henry
                        <br />
                        j. buck
                    </DippedNametag>

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

                    <Signature>
                        <Media src={signature} />
                    </Signature>
                </InfoContainer>
            </Bio>
        </Segment>
    );
}
