import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import { styled } from "styled-components";

import { portfolioOptions } from "../../global/richTextOptions";

import MiniService from "../../types/components/MiniService";

import { packRichText } from "../../types/RichText";
import ButtonRight from "../Button";
import { Heading2, Paragraph } from "../Typography";
import Media from "../media/Media";

const MiniServiceHeader = styled(Heading2)`
    margin: 0.5rem 0 0 0;
`;

const MiniServiceParagraph = styled(Paragraph)`
    margin: 0.1rem 0 0.5rem 0;
`;

const MiniServiceButton = styled(ButtonRight)`
    font-size: 1.5rem;
`;

const MiniServiceWrapper = styled.div``;

type MiniServiceProps = {
    src: MiniService;
};

export default function MiniServiceCard({ src }: MiniServiceProps) {
    return (
        <MiniServiceWrapper>
            <Media src={src.image} aspectRatio={1.5} />
            <MiniServiceHeader>{src.title}</MiniServiceHeader>
            <MiniServiceParagraph>
                {renderRichText(
                    packRichText(src.description),
                    portfolioOptions,
                )}
            </MiniServiceParagraph>
            <MiniServiceButton
                type="fill"
                direction="right"
                to={`/contact/${src.slug}`}
            >
                {src.buttonText}
            </MiniServiceButton>
        </MiniServiceWrapper>
    );
}
