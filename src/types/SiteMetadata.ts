import { graphql, useStaticQuery } from "gatsby";

export interface SiteMetadata {
    title: string;
    siteUrl: string;
    hubspot: {
        trackingScript: string;
        portalId: string;
        forms: {
            contact: string;
            newsletter: string;
        };
    };
}

export function useSiteMetadata(): SiteMetadata {
    return useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    title
                    siteUrl
                    hubspot {
                        trackingScript
                        portalId
                        forms {
                            contact
                            newsletter
                        }
                    }
                }
            }
        }
    `).site.siteMetadata;
}
