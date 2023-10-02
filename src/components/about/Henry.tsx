import React from "react";
import styled from "styled-components";

import Asset from "../../types/Asset";
import PortfolioItem from "../../types/PortfolioItem";
import Pitch, { PitchButton } from "./Pitch";
import Segment from "./Segment";
import { BioParagraph, DippedNametag, Nametag } from "./Typography";

type HenryProps = {
    portfolioItems: PortfolioItem[];
    portrait: Asset;
};

const Bio = styled.div``;

export default function Henry({ portfolioItems }: HenryProps) {
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
            </Bio>
        </Segment>
    );
}
