import { graphql } from "gatsby";

import MiniService from "../components/MiniService";

export default interface MiniServiceCollection {
    __typename: "ContentfulMiniServiceCollection";
    contentful_id: string;
    title: string;
    items: MiniService[];
}

export const miniServiceCollectionFragment = graphql`
    fragment MiniServiceCollection on ContentfulMiniServiceCollection {
        __typename
        contentful_id
        title
        items {
            ...MiniService
        }
    }
`;
