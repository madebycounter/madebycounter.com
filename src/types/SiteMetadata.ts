import { graphql, useStaticQuery } from "gatsby";

export interface SiteMetadata {
    title: string;
    siteUrl: string;
    web3forms: string;
    hubspot: string;
}

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
