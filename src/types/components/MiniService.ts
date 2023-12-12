import { graphql, useStaticQuery } from "gatsby";

import { RichText } from "..";
import Asset from "../Asset";

export default interface MiniService {
    __typename: "ContentfulMiniService";
    contentful_id: string;
    title: string;
    image: Asset;
    description: RichText;
    buttonText: string;
    slug: string;
}

export function useMiniServices(): MiniService[] {
    return useStaticQuery(graphql`
        query MiniServices {
            allContentfulMiniService {
                nodes {
                    ...MiniService
                }
            }
        }
    `).allContentfulMiniService.nodes;
}

export const miniServiceFragment = graphql`
    fragment MiniService on ContentfulMiniService {
        __typename
        contentful_id
        title
        image {
            ...Asset
        }
        description {
            raw
        }
        buttonText
        slug
    }
`;
