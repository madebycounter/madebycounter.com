import { graphql, useStaticQuery } from "gatsby";

import Asset from "../Asset";

export default interface MediaCollection {
    __typename: "ContentfulMediaCollection";
    contentful_id: string;
    title: string;
    items: Asset[];
}

export function useMediaCollections(): MediaCollection[] {
    return useStaticQuery(graphql`
        query MediaCollections {
            allContentfulMediaCollection {
                nodes {
                    ...MediaCollection
                }
            }
        }
    `).allContentfulMediaCollection.nodes;
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

    fragment MediaCollectionSmall on ContentfulMediaCollection {
        __typename
        contentful_id
        title
        items {
            ...AssetSmall
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
