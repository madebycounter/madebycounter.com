import { graphql, useStaticQuery } from "gatsby";

import PortfolioItem from "../PortfolioItem";

export default interface PortfolioItemCollection {
    __typename: "ContentfulPortfolioItemCollection";
    contentful_id: string;
    title: string;
    items: PortfolioItem[];
}

export function usePortfolioItemCollections(): PortfolioItemCollection[] {
    return useStaticQuery(graphql`
        query PortfolioItemCollections {
            allContentfulPortfolioItemCollection {
                nodes {
                    ...PortfolioItemCollection
                }
            }
        }
    `).allContentfulPortfolioItemCollection.nodes;
}

export const portfolioItemCollectionFragment = graphql`
    fragment PortfolioItemCollection on ContentfulPortfolioItemCollection {
        __typename
        contentful_id
        title
        items {
            ...PortfolioItemRef
        }
    }
`;
