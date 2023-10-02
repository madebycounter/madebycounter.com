import React from "react";

import PortfolioItem from "../../types/PortfolioItem";
import Pitch from "./Pitch";
import Segment from "./Segment";

type WilliamProps = {
    portfolioItems: PortfolioItem[];
};

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
        </Segment>
    );
}
