import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

const StyledContactForm = styled.form``;

const StyledInput = styled.input`
    font-family: var(--body-font);
    border: solid ${({ theme }) => theme.color} 2px;
    background: ${({ theme }) => theme.backgroundColor};
    caret-color: ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.color};
    display: block;
    width: calc(100% - 0.8rem);
    font-size: 1.2rem;
    padding: 0.2rem;
    margin: 0.5rem 0;

    :focus {
        outline: 1px solid ${({ theme }) => theme.color};
    }

    ::placeholder {
        opacity: 1;
        color: ${({ theme }) => theme.color};
        font-weight: 400;
    }
`;

const StyledTextArea = styled.textarea`
    font-family: var(--body-font);
    border: solid ${({ theme }) => theme.color} 2px;
    background: ${({ theme }) => theme.backgroundColor};
    caret-color: ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.color};
    display: block;
    width: calc(100% - 0.8rem);
    font-size: 1.2rem;
    padding: 0.2rem;
    margin: 0.5rem 0;
    resize: none;
    min-height: 10rem;

    :focus {
        outline: 1px solid ${({ theme }) => theme.color};
    }
`;

const StyledButton = styled.button`
    font-family: var(--body-font);
    border: none;
    border-bottom: solid ${({ theme }) => theme.color} 2px;
    color: ${({ theme }) => theme.color};
    background: none;
    font-size: 1.2rem;
    display: block;
    cursor: pointer;
    float: right;
`;

const ContactForm = () => {
    const data = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    web3forms
                    siteUrl
                }
            }
        }
    `);

    return (
        <StyledContactForm
            action="https://api.web3forms.com/submit"
            method="POST"
        >
            <input
                type="hidden"
                name="access_key"
                value={data.site.siteMetadata.web3forms}
            />

            <input
                type="hidden"
                name="subject"
                value="Contact Form Submission"
            />

            <input
                type="hidden"
                name="redirect"
                value={`${data.site.siteMetadata.siteUrl}/success`}
            />

            <StyledInput type="text" name="name" placeholder="Name" required />
            <StyledInput
                type="text"
                name="email"
                placeholder="Email/Phone"
                required
            />
            <StyledTextArea name="message" required />

            <StyledButton type="submit">Submit</StyledButton>
        </StyledContactForm>
    );
};

export default ContactForm;
