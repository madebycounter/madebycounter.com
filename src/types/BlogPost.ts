import { graphql, useStaticQuery } from "gatsby";

import TeamMember from "./components/TeamMember";

import { MetaImage } from ".";
import Asset from "./Asset";
import { RichTextResponse } from "./RichText";

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
    content: RichTextResponse;
    slug: string;
    summary: {
        summary: string;
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
            assetReferences: references {
                ...Asset
            }
            socialMediaEmbedReferences: references {
                ...SocialMediaEmbed
            }
            mediaCollectionReferences: references {
                ...MediaCollection
            }
            portfolioItemReferences: references {
                ...PortfolioItem
            }
            blogPostReferences: references {
                ...BlogPostSimple
            }
        }
        slug
        summary {
            summary
        }
    }

    fragment BlogPostSimple on ContentfulBlogPost {
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
        slug
        content {
            raw
        }
        summary {
            summary
        }
    }
`;
