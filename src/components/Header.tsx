import { graphql, useStaticQuery } from "gatsby";
import React from "react";

type HeaderProps = {
    title: string;
    description: string;
};

const Header = ({ title, description }: HeaderProps) => {
    const data: { site: { siteMetadata: { hubspot: string } } } =
        useStaticQuery(graphql`
            {
                site {
                    siteMetadata {
                        hubspot
                    }
                }
            }
        `);

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

            <title>Counter | {title}</title>
            <meta name="description" content={description} />

            <script
                type="text/javascript"
                id="hs-script-loader"
                async
                defer
                src={data.site.siteMetadata.hubspot}
            ></script>
        </>
    );
};

export default Header;
