import { graphql, useStaticQuery } from "gatsby";

import BlogPost from "../BlogPost";

export default interface BlogPostCollection {
    __typename: "ContentfulBlogPostCollection";
    contentful_id: string;
    title: string;
    items: BlogPost[];
}

export function useBlogPostCollections(): BlogPostCollection[] {
    return useStaticQuery(graphql`
        query BlogPostCollections {
            allContentfulBlogPostCollection {
                nodes {
                    ...BlogPostCollection
                }
            }
        }
    `).allContentfulBlogPostCollection.nodes;
}

export const blogPostCollectionFragment = graphql`
    fragment BlogPostCollection on ContentfulBlogPostCollection {
        __typename
        contentful_id
        title
        items {
            ...BlogPostRef
        }
    }
`;
