import React, { useRef, useState } from "react";
import styled from "styled-components";

import { submitHubspotForm } from "../../global/hubspot";

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

const ContactFormWrapper = styled(Form)`
    grid-template-rows: auto auto 1fr auto;
`;

export default function ContactForm() {
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
            {
                pageUri: "madebycounter.com/testing",
                pageName: "Counter | Test Page",
            },
        ).then((data) => {
            console.log(data);
            setModalOpen(true);
            setIsLoading(false);
        });
    }

    return (
        <>
            <Modal open={modalOpen}>
                <Heading1>Form Submitted</Heading1>
                <Paragraph>Thanks, we'll be in touch soon!</Paragraph>

                <FormButton onClick={() => setModalOpen(false)}>
                    Close
                </FormButton>
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
