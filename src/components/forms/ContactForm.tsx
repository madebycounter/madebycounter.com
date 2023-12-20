import React, { useRef, useState } from "react";
import styled from "styled-components";

import { HubspotFormContext, submitHubspotForm } from "../../global/hubspot";

import { useSiteMetadata } from "../../types/SiteMetadata";
import Modal from "../Modal";
import { Heading1, Paragraph } from "../Typography";
import {
    FormInput,
    FormTextArea,
    FormSubmit,
    FormSplit,
    Form,
    FormButton,
} from "./Forms";

const ModalContent = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
    max-width: 100%;
    width: 400px;
    padding: 1rem;
    box-sizing: border-box;
`;

const ContactFormWrapper = styled(Form)`
    grid-template-rows: auto auto 1fr auto;
`;

type ContactFormData = {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
};

type ContactFormProps = {
    formContext: HubspotFormContext;
    onSubmitted?: (data: ContactFormData) => void;
};

export default function ContactForm({
    formContext,
    onSubmitted,
}: ContactFormProps) {
    const siteMetadata = useSiteMetadata();

    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    function submit() {
        setIsLoading(true);

        submitHubspotForm(
            siteMetadata.hubspot.portalId,
            siteMetadata.hubspot.forms.contact,
            [
                {
                    name: "firstname",
                    value: firstName,
                },
                {
                    name: "lastname",
                    value: lastName,
                },
                {
                    name: "email",
                    value: email,
                },
                {
                    name: "message",
                    value: message,
                },
            ],
            formContext,
        ).then((data) => {
            setModalOpen(true);
            setIsLoading(false);

            if (onSubmitted)
                onSubmitted({
                    firstName,
                    lastName,
                    email,
                    message,
                });
        });
    }

    return (
        <>
            <Modal open={modalOpen} setOpen={setModalOpen}>
                <ModalContent>
                    <Heading1>Form Submitted</Heading1>
                    <Paragraph>Thanks, we'll be in touch soon!</Paragraph>

                    <FormButton onClick={() => setModalOpen(false)}>
                        Close
                    </FormButton>
                </ModalContent>
            </Modal>

            <ContactFormWrapper onSubmit={submit}>
                <FormSplit>
                    <FormInput
                        placeholder="First Name*"
                        name="firstname"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <FormInput
                        placeholder="Last Name"
                        name="lastname"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </FormSplit>
                <FormInput
                    placeholder="Email*"
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <FormTextArea
                    placeholder="Message"
                    name="message"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <FormSubmit loading={isLoading}>Submit</FormSubmit>
            </ContactFormWrapper>
        </>
    );
}
