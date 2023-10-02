import React from "react";
import styled from "styled-components";

import Asset from "../../types/Asset";
import PortfolioItem from "../../types/PortfolioItem";
import Pitch, { PitchButton } from "./Pitch";
import Segment from "./Segment";
import { BioParagraph, Nametag } from "./Typography";

type LukeProps = {
    portfolioItems: PortfolioItem[];
    portrait: Asset;
};

const Bio = styled.div``;

export default function Luke({ portfolioItems }: LukeProps) {
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
            </Bio>
        </Segment>
    );
}
