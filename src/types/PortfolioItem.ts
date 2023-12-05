import { graphql, useStaticQuery } from "gatsby";

import { MetaImage, RichText } from ".";
import Asset from "./Asset";

export default interface PortfolioItem {
    __typename: "ContentfulPortfolioItem";
    contentful_id: string;
    title: string;
    date: string;
    tags: string[];
    description: RichText;
    thumbnail: Asset;
    metaImage: MetaImage;
    slideshow?: Asset[];
    gallery?: Asset[];
    youTube?: string;
    hidden: boolean;
    slug: string;
}

export function usePortfolioItems(): PortfolioItem[] {
    return useStaticQuery(graphql`
        {
            allContentfulPortfolioItem(sort: { date: DESC }) {
                nodes {
                    ...PortfolioItem
                }
            }
        }
    `).allContentfulPortfolioItem.nodes;
}

export const portfolioEntryFragment = graphql`
    fragment PortfolioItem on ContentfulPortfolioItem {
        __typename
        contentful_id
        title
        date(formatString: "MM.DD.YYYY")
        tags
        description {
            raw
        }
        thumbnail {
            ...Asset
        }
        metaImage: thumbnail {
            gatsbyImageData(
                height: 627
                width: 1200
                breakpoints: 1200
                resizingBehavior: FILL
            )
        }
        slideshow {
            ...Asset
        }
        gallery {
            ...Asset
        }
        youTube
        hidden
        slug
    }

    fragment PortfolioItemRef on ContentfulPortfolioItem {
        __typename
        contentful_id
        title
        date(formatString: "MM.DD.YYYY")
        tags
        description {
            raw
        }
        thumbnail {
            ...Asset
        }
        slideshow {
            ...Asset
        }
        youTube
        hidden
        slug
    }
`;
