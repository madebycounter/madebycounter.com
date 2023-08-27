import { graphql } from "gatsby";

export default interface SocialMediaEmbed {
    contentful_id: string;
    title: string;
    platform: "Instagram";
    url: string;
}

export const serviceFragment = graphql`
    fragment SocialMediaEmbed on ContentfulSocialMediaEmbed {
        contentful_id
        title
        platform
        url
    }
`;
