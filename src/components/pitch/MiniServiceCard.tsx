import { renderRichText } from "gatsby-source-contentful/rich-text";
import React, { useState } from "react";
import { styled } from "styled-components";

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

const ModalContent = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
    width: 100%;
    max-width: 1150px;
`;

const FormBox = styled.div`
    position: relative;
    padding: 2rem;
`;

const MediaBox = styled.div`
    @media (max-width: 850px) {
        display: none;
    }
`;

const CtaSlash = styled(Slash)`
    position: absolute;
    height: 100%;
    left: calc(100%);
    top: 0;

    @media (max-width: 850px) {
        display: none;
    }
`;

type CallToActionProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    miniService: MiniService;
};

function CallToAction({ open, setOpen, miniService }: CallToActionProps) {
    return (
        <Modal open={open} setOpen={setOpen}>
            <ModalContent>
                <FormBox>
                    <Nametag>Get in touch:</Nametag>

                    <br />

                    <ContactForm
                        formContext={{
                            pageUri: `madebycounter.com/contact/${miniService.slug}`,
                            pageName: `Counter | ${miniService.title}`,
                        }}
                    />

                    <CtaSlash />
                </FormBox>

                <MediaBox>
                    <Media src={miniService.image} resizeMode="cover" />
                </MediaBox>
            </ModalContent>
        </Modal>
    );
}

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
    const [open, setOpen] = useState(false);

    return (
        <>
            <CallToAction open={open} setOpen={setOpen} miniService={src} />

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
