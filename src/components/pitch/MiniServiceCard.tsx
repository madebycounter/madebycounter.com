import { renderRichText } from "gatsby-source-contentful/rich-text";
import React, { useState } from "react";
import { styled } from "styled-components";

import { HubspotFormContext } from "../../global/hubspot";
import { portfolioOptions } from "../../global/richTextOptions";

import MiniService from "../../types/components/MiniService";

import { packRichText } from "../../types/RichText";
import ButtonRight from "../Button";
import Modal from "../Modal";
import { Heading2, Paragraph } from "../Typography";
import { Nametag } from "../about/Typography";
import Slash from "../cards/utils/Slash";
import ContactForm from "../forms/ContactForm";
import Media from "../media/Media";
import CallToAction from "./CallToAction";

const MiniServiceHeader = styled(Heading2)`
    margin: 0.5rem 0 0 0;
`;

const MiniServiceParagraph = styled(Paragraph)`
    margin: 0.1rem 0 0.5rem 0;
`;

const MiniServiceButton = styled(ButtonRight)`
    font-size: 1.5rem;
`;

const MiniServiceWrapper = styled.div`
    min-width: 280px;
`;

type MiniServiceProps = {
    src: MiniService;
    context: HubspotFormContext;
};

export default function MiniServiceCard({ src, context }: MiniServiceProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <CallToAction
                open={open}
                setOpen={setOpen}
                image={src.image}
                context={context}
            />

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
                    onClick={() => setOpen(true)}
                    to={`/contact/${src.slug}`}
                >
                    {src.buttonText}
                </MiniServiceButton>
            </MiniServiceWrapper>
        </>
    );
}
