import { graphql } from "gatsby";

export interface PitchPage {
    title: string;
    slug: string;
}

export const pitchPageFragment = graphql`
    fragment PitchPage on ContentfulPitchPage {
        __typename
        contentful_id
        title
        slug
    }
`;
