import { graphql, useStaticQuery } from "gatsby";

export default interface SocialMediaEmbed {
    __typename: "ContentfulSocialMediaEmbed";
    contentful_id: string;
    title: string;
    platform: "Instagram";
    url: string;
}

export function useSocialMediaEmbeds(): SocialMediaEmbed[] {
    return useStaticQuery(graphql`
        query SocialMediaEmbeds {
            allContentfulSocialMediaEmbed {
                nodes {
                    ...SocialMediaEmbed
                }
            }
        }
    `).allContentfulSocialMediaEmbed.nodes;
}

export const serviceFragment = graphql`
    fragment SocialMediaEmbed on ContentfulSocialMediaEmbed {
        __typename
        contentful_id
        title
        platform
        url
    }
`;
