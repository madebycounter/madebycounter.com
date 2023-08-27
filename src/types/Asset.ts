import { graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

export default interface Asset {
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
        gatsbyImageData(breakpoints: [750, 1080, 1366, 1920], formats: WEBP)
        dimensions {
            width
            height
        }
    }
`;
