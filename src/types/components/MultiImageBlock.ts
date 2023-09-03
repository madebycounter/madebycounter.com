import { graphql } from "gatsby";

import Asset from "../Asset";

export default interface MultiImageBlock {
    __typename: "ContentfulMultiImageBlock";
    contentful_id: string;
    title: string;
    images: Asset[];
}

export const multiImageBlockFragment = graphql`
    fragment MultiImageBlock on ContentfulMultiImageBlock {
        __typename
        contentful_id
        title
        images {
            ...Asset
        }
    }
`;
