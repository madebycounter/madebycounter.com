import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { LightTheme } from "../global/themes";

import Header from "../components/Header";
import HubspotForm from "../components/HubspotForm";
import { LayoutMini } from "../components/Layout";
import Navbar from "../components/Navbar";
import { Heading1, Paragraph } from "../components/Typography";

import { useSiteMetadata } from "../types/SiteMetadata";

export default function Newsletter() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const siteMetadata = useSiteMetadata();

    return (
        <ThemeProvider theme={LightTheme}>
            <GlobalStyle />

            <Navbar active="" />

            <LayoutMini>
                <br />

                <Heading1>Sign up for our newsletter!</Heading1>

                <br />

                {!isSubmitted ? (
                    <HubspotForm
                        portalId={siteMetadata.hubspot.portalId}
                        formId={siteMetadata.hubspot.forms.newsletter}
                        onFormSubmit={(form: any) => {
                            setIsSubmitted(true);
                        }}
                    />
                ) : (
                    <Paragraph>Thanks for subscribing!</Paragraph>
                )}
            </LayoutMini>
        </ThemeProvider>
    );
}

export const Head = () => (
    <Header
        location="/newsletter"
        title="Sign up for our monthly newsletter!"
    />
);
