import React from "react";
import styled from "styled-components";

import DynamicTitle from "../DynamicTitle";
import Highlight from "../Highlight";
import { Paragraph } from "../Typography";
import MediaGrid from "./MediaGrid";

const Layout = styled.div`
    width: 100%;
    height: 800px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
`;

const InfoContainer = styled.div`
    padding-top: 2rem;
    padding-left: 2rem;

    ${Paragraph} {
        width: 90%;
        margin: 2rem 0;
    }

    @media (max-width: 700px) {
        order: 1;
    }
`;

const MediaContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
`;

const Title = styled(DynamicTitle)`
    color: ${({ theme }) => theme.color};
    font-family: ${({ theme }) => theme.fonts.title};
`;

const Hero = () => {
    return (
        <Layout>
            <InfoContainer>
                <Title size={7.5}>
                    We make cool
                    <br />
                    stuff, <Highlight>see?</Highlight>
                </Title>

                <Paragraph>
                    We are a media production company based locally in San Jose,
                    CA. Focused on serving our community, we provide quality
                    media at an accessible price.
                </Paragraph>

                <br />

                <Paragraph>BUTTON!!!</Paragraph>
            </InfoContainer>

            <MediaContainer>
                <MediaGrid />
            </MediaContainer>
        </Layout>
    );
};

export default Hero;
