import React from "react";
import styled from "styled-components";

import { HubspotFormContext } from "../../global/hubspot";

import Asset from "../../types/Asset";
import Modal from "../Modal";
import { Nametag } from "../about/Typography";
import Slash from "../cards/utils/Slash";
import ContactForm from "../forms/ContactForm";
import Media from "../media/Media";

const ModalContent = styled.div`
    display: flex;
    align-items: stretch;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
    width: 100%;
    max-width: 1150px;
    max-height: 500px;

    @media (max-width: 850px) {
        max-height: none;
    }
`;

const FormBox = styled.div`
    position: relative;
    padding: 2rem;

    @media (max-width: 850px) {
        padding: 1rem;
    }
`;

const MediaBox = styled.div`
    @media (max-width: 850px) {
        display: none;
    }
`;

const CtaSlash = styled(Slash)`
    position: absolute;
    height: 100%;
    left: calc(100% - 1px);
    top: 0;

    @media (max-width: 850px) {
        display: none;
    }
`;

type CallToActionProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    image: Asset;
    context: HubspotFormContext;
};

export default function CallToAction({
    open,
    setOpen,
    image,
    context,
}: CallToActionProps) {
    return (
        <Modal open={open} setOpen={setOpen}>
            <ModalContent>
                <FormBox>
                    <Nametag>Get in touch:</Nametag>

                    <br />

                    <ContactForm formContext={context} />

                    <CtaSlash />
                </FormBox>

                <MediaBox>
                    <Media src={image} resizeMode="cover" />
                </MediaBox>
            </ModalContent>
        </Modal>
    );
}
