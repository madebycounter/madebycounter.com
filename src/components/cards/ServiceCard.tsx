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
    service: Service;
};

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <StyledServiceCard to={`/services/${service.slug}`}>
            <StyledServiceCardInfo>
                <Heading1>{service.pitchTitle}</Heading1>

                <StyledButton to="#" type="normal" direction="right">
                    {service.callToAction}
                </StyledButton>
            </StyledServiceCardInfo>

            <StyledServiceCardMedia>
                <Slideshow src={service.slideshow.items} />
            </StyledServiceCardMedia>

            <StyledServiceCardPortrait>
                <Media src={service.teamMember.fullBody} />
            </StyledServiceCardPortrait>
        </StyledServiceCard>
    );
}
