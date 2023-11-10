import React from "react";
import { styled } from "styled-components";

import Asset from "../../types/Asset";
import ButtonRight from "../Button";
import { Heading2, Paragraph } from "../Typography";
import Media from "../media/Media";

const DetailedServiceHeader = styled(Heading2)`
    margin: 0.5rem 0 0 0;
`;

const DetailedServiceParagraph = styled(Paragraph)`
    margin: 0.1rem 0 0.5rem 0;
`;

const DetailedServiceButton = styled(ButtonRight)`
    font-size: 1.5rem;
`;

const DetailedServiceWrapper = styled.div``;

type DetailedServiceProps = {
    image: Asset;
    title: string;
    description: string;
    to: string;
};

export default function DetailedService({
    image,
    title,
    description,
    to,
}: DetailedServiceProps) {
    return (
        <DetailedServiceWrapper>
            <Media src={image} aspectRatio={1.5} />
            <DetailedServiceHeader>{title}</DetailedServiceHeader>
            <DetailedServiceParagraph>{description}</DetailedServiceParagraph>
            <DetailedServiceButton type="fill" direction="right" to={to}>
                Learn More
            </DetailedServiceButton>
        </DetailedServiceWrapper>
    );
}
