import { graphql } from "gatsby";

import { MetaImage, RichText } from ".";
import Asset from "./Asset";

export default interface PortfolioItem {
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
    slug: string;
}

export const portfolioEntryFragment = graphql`
    fragment PortfolioItem on ContentfulPortfolioItem {
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
        slug
    }
`;
