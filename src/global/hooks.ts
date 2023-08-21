import { graphql, useStaticQuery } from "gatsby";

import { SiteMetadata } from "./types";

export function useSiteMetadata(): SiteMetadata {
    return useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    title
                    siteUrl
                    web3forms
                    hubspot
                }
            }
        }
    `).site.siteMetadata;
}
