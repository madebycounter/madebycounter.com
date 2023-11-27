import { graphql, useStaticQuery } from "gatsby";

import TeamMember from "./components/TeamMember";

import { MetaImage, RichText } from ".";
import Asset from "./Asset";

export default interface BlogPost {
    __typename: "ContentfulBlogPost";
    contentful_id: string;
    title: string;
    date: string;
    dateDotted: string;
    author: TeamMember;
    banner: Asset;
    bannerMiddle: number;
    metaImage: MetaImage;
    content: RichText;
    slug: string;
    description: {
        description: string;
    };
}

export function useBlogPosts(): BlogPost[] {
    return useStaticQuery(graphql`
        query BlogPosts {
            allContentfulBlogPost {
                nodes {
                    ...BlogPost
                }
            }
        }
    `).allContentfulBlogPost.nodes;
}

export const blogPostFragment = graphql`
    fragment BlogPost on ContentfulBlogPost {
        __typename
        contentful_id
        title
        date(formatString: "MMMM D, YYYY")
        dateDotted: date(formatString: "MM.DD.YYYY")
        author {
            ...TeamMember
        }
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
                ...Asset
                ...SocialMediaEmbed
                ...MediaCollection
            }
        }
        slug
        description {
            description
        }
    }
`;
