import React from "react";
import styled from "styled-components";

import Asset from "../../types/Asset";
import PortfolioItem from "../../types/PortfolioItem";
import Pitch, { PitchButton } from "./Pitch";
import Segment from "./Segment";
import { BioParagraph, DippedNametag, Nametag } from "./Typography";

type WilliamProps = {
    portfolioItems: PortfolioItem[];
    portrait: Asset;
    signature: Asset;
    dronePortrait: Asset;
    slideshow1: Asset[];
    slideshow2: Asset[];
};

const Bio = styled.div``;

export default function William({ portfolioItems }: WilliamProps) {
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
                button={<PitchButton to="#">Learn More</PitchButton>}
            />

            {/* <Bio>
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
            </Bio> */}
        </Segment>
    );
}
