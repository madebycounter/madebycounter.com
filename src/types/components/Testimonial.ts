import { graphql } from "gatsby";

import { RichText } from "..";
import Asset from "../Asset";

export default interface Testimonial {
    __typename: "ContentfulTestimonial";
    contentful_id: string;
    name: string;
    jobTitle: string[];
    content: RichText;
    headshot: Asset;
    rating: number;
}

export const testimonialFragment = graphql`
    fragment Testimonial on ContentfulTestimonial {
        __typename
        contentful_id
        name
        jobTitle
        content {
            raw
        }
        headshot {
            ...Asset
        }
        rating
    }
`;
