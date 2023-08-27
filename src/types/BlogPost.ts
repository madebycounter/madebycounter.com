import { graphql } from "gatsby";

import { MetaImage, RichText, TeamMember } from ".";
import Asset from "./Asset";

export default interface BlogPost {
    contentful_id: string;
    title: string;
    date: string;
    author: TeamMember;
    banner: Asset;
    bannerMiddle: number;
    metaImage: MetaImage;
    content: RichText;
    slug: string;
}

export const blogPostFragment = graphql`
    fragment BlogPost on ContentfulBlogPost {
        contentful_id
        title
        date(formatString: "MMMM D, YYYY")
        author
        banner {
            ...Asset
        }
        metaImage: banner {
            gatsbyImageData(
                height: 627
                width: 1200
                breakpoints: 1200
                resizingBehavior: FILL
            )
        }
        bannerMiddle
        content {
            raw
            references {
                ... on ContentfulAsset {
                    ...Asset
                }
                ... on ContentfulSocialMediaEmbed {
                    ...SocialMediaEmbed
                }
            }
        }
        slug
    }
`;
