import { graphql } from "gatsby";

import Asset from "../Asset";

export default interface MediaCollection {
    __typename: "ContentfulMediaCollection";
    contentful_id: string;
    title: string;
    media: Asset[];
    slug: string;
}

export const mediaCollectionFragment = graphql`
    fragment MediaCollection on ContentfulMediaCollection {
        __typename
        contentful_id
        title
        media {
            ...Asset
        }
        slug
    }

    fragment CarouselMediaCollection on ContentfulMediaCollection {
        __typename
        contentful_id
        title
        media {
            ...CarouselAsset
        }
        slug
    }
`;
