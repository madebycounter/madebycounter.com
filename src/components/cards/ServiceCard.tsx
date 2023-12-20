import React from "react";
import styled from "styled-components";

import Service from "../../types/Service";
import Button from "../Button";
import { Heading1 } from "../Typography";
import Media from "../media/Media";
import Slideshow from "../media/Slideshow";
import LinkDiv from "./utils/LinkDiv";

const StyledButton = styled(Button)`
    font-size: 2rem;
`;

const StyledSlideshow = styled(Slideshow)``;

const StyledServiceCard = styled(LinkDiv)`
    display: grid;
    grid-template-columns: 1fr 270px;

    position: relative;
    overflow: hidden;
    padding-top: 0.5rem;

    height: 145px;

    gap: 1rem;

    ${Heading1} {
        font-size: 3rem;
        margin-bottom: 0.5rem;
    }
`;

const SlideshowBox = styled.div`
    aspect-ratio: 16 / 9;
`;

const InfoBox = styled.div`
    min-width: 180px;
`;

type ServiceCardProps = {
    item: Service;
};

export default function ServiceCard({ item }: ServiceCardProps) {
    var realTitle = item.title;

    if (item.title === "Videography") {
        realTitle = "Video Services";
    }

    if (item.title === "Photography") {
        realTitle = "Photo Services";
    }

    return (
        <StyledServiceCard to={`/services/${item.slug}`}>
            <InfoBox>
                <Heading1>{realTitle}</Heading1>

                <StyledButton
                    to={`/services/${item.slug}`}
                    type="normal"
                    direction="right"
                >
                    Learn More
                </StyledButton>
            </InfoBox>

            <SlideshowBox>
                <StyledSlideshow
                    src={item.slideshow.items}
                    aspectRatio={16 / 9}
                />
            </SlideshowBox>
        </StyledServiceCard>
    );
}
