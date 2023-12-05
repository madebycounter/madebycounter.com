import { graphql } from "gatsby";

import BlogPost from "../BlogPost";

export default interface BlogPostCollection {
    __typename: "ContentfulBlogPostCollection";
    contentful_id: string;
    title: string;
    items: BlogPost[];
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
