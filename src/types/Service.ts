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
    pitchHero: RichText;
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
        pitchHero {
            raw
        }
        pitchFunFact: pitch {
            ...FunFact
        }
        pitchTestimonial: pitch {
            ...Testimonial
        }
        pitchMediaCollection: pitch {
            ...MediaCollectionSmall
        }
        pitchMiniServiceCollection: pitch {
            ...MiniServiceCollection
        }
        pitchPortfolioItemCollection: pitch {
            ...PortfolioItemCollection
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

    fragment ServiceRef on ContentfulService {
        __typename
        contentful_id
        title
        slideshow {
            ...MediaCollection
        }
        youTube
        pitchHero {
            raw
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

function insertPitchElems<T extends PitchElement | {}>(
    elemArray: (PitchElement | {})[],
    items: T[],
) {
    for (let i = 0; i < items.length; i++) {
        var item = items[i];
        if (isPitchElem(item)) {
            elemArray[i] = item;
        }
    }
}

export function getPitch(service: Service): PitchElement[] {
    var pitchElements: (PitchElement | {})[] = Array(
        service.pitchFunFact.length,
    ).fill({});

    insertPitchElems(pitchElements, service.pitchFunFact || []);
    insertPitchElems(pitchElements, service.pitchTestimonial || []);
    insertPitchElems(pitchElements, service.pitchMediaCollection || []);
    insertPitchElems(pitchElements, service.pitchMiniServiceCollection || []);
    insertPitchElems(pitchElements, service.pitchPortfolioItemCollection || []);
    insertPitchElems(pitchElements, service.pitchBlogPostCollection || []);

    console.log("pe", pitchElements);

    return pitchElements.filter(isPitchElem);
}
