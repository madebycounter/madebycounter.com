import React from "react";
import styled from "styled-components";

import Highlight from "../Highlight";
import Caret from "./Caret";

const StyledSplash = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    /* change offset to account for mobile browser navbars */
    --offset: 4rem;

    @media (max-width: 700px) {
        --offset: 5rem;
    }

    h1 {
        padding-bottom: 10rem;
        font-size: min(14vw, 10rem);
        line-height: 0.9em;
        letter-spacing: -0.04em;
    }
`;

const Splash = () => {
    return (
        <StyledSplash>
            <h1>
                We make cool
                <br />
                stuff,&nbsp;
                <Highlight>see?</Highlight>
            </h1>

            <Caret size="64px" bottom="var(--offset)" href="#content" />
        </StyledSplash>
    );
};

export default Splash;
