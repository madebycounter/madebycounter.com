import { graphql } from "gatsby";

import { RichText } from "..";
import Asset from "../Asset";

export default interface MiniService {
    __typename: "ContentfulMiniService";
    contentful_id: string;
    title: string;
    image: Asset;
    metaImage: Asset;
    description: RichText;
    buttonText: string;
    slug: string;
}

export const miniServiceFragment = graphql`
    fragment MiniService on ContentfulMiniService {
        __typename
        contentful_id
        title
        image {
            ...Asset
        }
        metaImage: image {
            gatsbyImageData(
                height: 627
                width: 1200
                breakpoints: 1200
                resizingBehavior: FILL
            )
        }
        description {
            raw
        }
        buttonText
        slug
    }
`;
