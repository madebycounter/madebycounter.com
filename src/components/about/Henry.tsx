import React from "react";

import PortfolioItem from "../../types/PortfolioItem";
import Pitch, { PitchButton } from "./Pitch";
import Segment from "./Segment";

type HenryProps = {
    portfolioItems: PortfolioItem[];
};

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
        </Segment>
    );
}
