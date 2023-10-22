import { graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

export default interface Asset {
    __typename: "ContentfulAsset";
    contentful_id: string;
    title: string;
    description: string;
    mimeType: string;
    publicUrl: string;
    dimensions: { width: number; height: number };
    gatsbyImageData?: IGatsbyImageData;
}

export const assetFragment = graphql`
    fragment Asset on ContentfulAsset {
        __typename
        contentful_id
        title
        description
        mimeType
        publicUrl
        gatsbyImageData(
            breakpoints: [500, 750, 1080, 1366, 1920]
            placeholder: DOMINANT_COLOR
            quality: 40
        )
        dimensions {
            width
            height
        }
    }

    fragment CarouselAsset on ContentfulAsset {
        __typename
        contentful_id
        title
        description
        mimeType
        publicUrl
        gatsbyImageData(
            width: 100
            height: 100
            resizingBehavior: THUMB
            placeholder: DOMINANT_COLOR
            quality: 40
        )
        dimensions {
            width
            height
        }
    }
`;
