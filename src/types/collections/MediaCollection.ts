import { graphql } from "gatsby";

import Asset from "../Asset";

export default interface MediaCollection {
    __typename: "ContentfulMediaCollection";
    contentful_id: string;
    title: string;
    items: Asset[];
}

export const mediaCollectionFragment = graphql`
    fragment MediaCollection on ContentfulMediaCollection {
        __typename
        contentful_id
        title
        items {
            ...Asset
        }
    }

    fragment CarouselMediaCollection on ContentfulMediaCollection {
        __typename
        contentful_id
        title
        items {
            ...CarouselAsset
        }
    }
`;
