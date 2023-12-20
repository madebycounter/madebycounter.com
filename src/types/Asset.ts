import { graphql, useStaticQuery } from "gatsby";
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

export function useAssets(): Asset[] {
    console.warn(
        "useAssets loads ALL assets into page data, not recommended for use in production.",
    );

    return useStaticQuery(graphql`
        query Assets {
            allContentfulAsset {
                nodes {
                    ...Asset
                }
            }
        }
    `).allContentfulAsset.nodes;
}

export const assetFragment = graphql`
    fragment Asset on ContentfulAsset {
        __typename
        contentful_id
        title
        description
        mimeType
        publicUrl
        gatsbyImageData(width: 1500, placeholder: DOMINANT_COLOR, quality: 40)
        dimensions {
            width
            height
        }
    }

    fragment AssetSmall on ContentfulAsset {
        __typename
        contentful_id
        title
        description
        mimeType
        publicUrl
        gatsbyImageData(width: 700, placeholder: DOMINANT_COLOR, quality: 20)
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
            quality: 20
        )
        dimensions {
            width
            height
        }
    }
`;
