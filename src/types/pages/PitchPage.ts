import { graphql } from "gatsby";

import Asset from "../Asset";

export interface PitchPage {
    title: string;
    slideshow: Asset[];
    slug: string;
}

export const pitchPageFragment = graphql`
    fragment PitchPage on ContentfulPitchPage {
        __typename
        contentful_id
        title
        slideshow {
            ...Asset
        }
        slug
    }
`;
