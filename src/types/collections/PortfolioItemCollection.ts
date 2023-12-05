import { graphql } from "gatsby";

import PortfolioItem from "../PortfolioItem";

export default interface PortfolioItemCollection {
    __typename: "ContentfulPortfolioItemCollection";
    contentful_id: string;
    title: string;
    items: PortfolioItem[];
}

export const portfolioItemCollectionFragment = graphql`
    fragment PortfolioItemCollection on ContentfulPortfolioItemCollection {
        __typename
        contentful_id
        title
        items {
            ...PortfolioItem
        }
    }
`;
