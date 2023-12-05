import { graphql, useStaticQuery } from "gatsby";

import FunFact from "./components/FunFact";
import TeamMember from "./components/TeamMember";
import Testimonial from "./components/Testimonial";

import { RichText } from ".";
import BlogPostCollection from "./collections/BlogPostCollection";
import MediaCollection from "./collections/MediaCollection";
import MiniServiceCollection from "./collections/MiniServiceCollection";
import PortfolioItemCollection from "./collections/PortfolioItemCollection";

export type PitchElement =
    | FunFact
    | Testimonial
    | MediaCollection
    | MiniServiceCollection
    | PortfolioItemCollection
    | BlogPostCollection;

export default interface Service {
    __typename: "ContentfulService";
    contentful_id: string;
    title: string;
    slideshow: MediaCollection;
    youTube?: string;
    pitchTitle: string;
    description: RichText;
    pitchFunFact: (FunFact | {})[];
    pitchTestimonial: (Testimonial | {})[];
    pitchMediaCollection: (MediaCollection | {})[];
    pitchMiniServiceCollection: (MiniServiceCollection | {})[];
    pitchPortfolioItemCollection: (PortfolioItemCollection | {})[];
    pitchBlogPostCollection: (BlogPostCollection | {})[];
    teamMember: TeamMember;
    buttonImages: MediaCollection;
    offerings: string[];
    callToAction: string;
    slug: string;
}

export function useServices(): Service[] {
    return useStaticQuery(graphql`
        {
            allContentfulService {
                nodes {
                    ...Service
                }
            }
        }
    `).allContentfulService.nodes;
}

export const serviceFragment = graphql`
    fragment Service on ContentfulService {
        __typename
        contentful_id
        title
        slideshow {
            ...MediaCollection
        }
        youTube
        pitchTitle
        description {
            raw
        }
        pitchFunFact: pitch {
            ...FunFact
        }
        pitchTestimonial: pitch {
            ...Testimonial
        }
        pitchMediaCollection: pitch {
            ...MediaCollection
        }
        pitchMiniServiceCollection: pitch {
            ...MiniServiceCollection
        }
        pitchPortfolioItemCollection: pitch {
            ...PortfolioItemCollection
        }
        pitchBlogPostCollection: pitch {
            ...BlogPostCollection
        }
        teamMember {
            ...TeamMember
        }
        buttonImages {
            ...CarouselMediaCollection
        }
        offerings
        callToAction
        slug
    }
`;

function isPitchElem(obj: PitchElement | {}): obj is PitchElement {
    return obj.hasOwnProperty("__typename");
}

export function getPitch(service: Service): PitchElement[] {
    return [
        ...(service.pitchFunFact || []),
        ...(service.pitchTestimonial || []),
        ...(service.pitchMediaCollection || []),
        ...(service.pitchMiniServiceCollection || []),
        ...(service.pitchPortfolioItemCollection || []),
        ...(service.pitchBlogPostCollection || []),
    ].filter(isPitchElem);
}
