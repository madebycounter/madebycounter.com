import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import { useSiteMetadata } from "../global/hooks";

import defaultImage from "../images/meta.png";

type HeaderProps = {
    title: string;
    description?: string;
    image?: string;
    children?: React.ReactNode;
};

const Header = ({
    title,
    description,
    image = defaultImage,
    children,
}: HeaderProps) => {
    const siteMetadata = useSiteMetadata();
    const fullTitle = `Counter | ${title}`;

    return (
        <>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
                rel="stylesheet"
            />

            <title>{fullTitle}</title>
            <meta name="image" content={image} />
            <meta name="description" content={description} />

            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="madebycounter.com" />
            <meta property="twitter:url" content={window.location.href} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <script
                type="text/javascript"
                id="hs-script-loader"
                async
                defer
                src={siteMetadata.hubspot}
            ></script>

            {children}
        </>
    );
};

export default Header;
