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

const StyledServiceCardPortrait = styled.div`
    .gatsby-image-wrapper {
        position: absolute;
        top: 0;
        left: 31%;
        width: 32%;
        z-index: 10;
    }
`;

const StyledServiceCard = styled(LinkDiv)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    overflow: hidden;
    padding-top: 0.5rem;

    ${Heading1} {
        font-size: 3rem;
        margin-bottom: 0.5rem;
    }
`;

const StyledServiceCardInfo = styled.div`
    ${Heading1} {
        width: 180px;
    }
`;

const StyledServiceCardMedia = styled.div``;

type ServiceCardProps = {
    item: Service;
};

export default function ServiceCard({ item }: ServiceCardProps) {
    return (
        <StyledServiceCard to={`/services/${item.slug}`}>
            <StyledServiceCardInfo>
                <Heading1>{item.title}</Heading1>

                <StyledButton
                    to={`/services/${item.slug}`}
                    type="normal"
                    direction="right"
                >
                    Learn More
                </StyledButton>
            </StyledServiceCardInfo>

            <StyledServiceCardMedia>
                <Slideshow src={item.slideshow.items} />
            </StyledServiceCardMedia>
        </StyledServiceCard>
    );
}
