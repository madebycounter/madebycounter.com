import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../global/globalStyle";
import { LightTheme } from "../global/themes";

import Header from "../components/Header";
import HubspotForm from "../components/HubspotForm";
import { LayoutMini } from "../components/Layout";
import Navbar from "../components/Navbar";
import { Heading1, Paragraph } from "../components/Typography";

export default function Newsletter() {
    const [isSubmitted, setIsSubmitted] = useState(false);

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
                        portalId="41260229"
                        formId="ee2cfa04-73fc-4629-a018-b9a22af7f9b0"
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
