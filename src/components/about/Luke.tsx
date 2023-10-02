import React from "react";

import PortfolioItem, { usePortfolioItems } from "../../types/PortfolioItem";
import Pitch from "./Pitch";
import PitchButton from "./PitchButton";
import Segment from "./Segment";

type LukeProps = {
    portfolioItems: PortfolioItem[];
};

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
        </Segment>
    );
}
