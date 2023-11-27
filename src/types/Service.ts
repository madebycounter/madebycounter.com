import { graphql, useStaticQuery } from "gatsby";

import MediaCollection from "./components/MediaCollection";
import TeamMember from "./components/TeamMember";

import Asset from "./Asset";

export default interface Service {
    __typename: "ContentfulService";
    contentful_id: string;
    title: string;
    offerings: string[];
    slideshow: Asset[];
    youTube?: string;
    buttonImages: MediaCollection;
    teamMember: TeamMember;
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
        offerings
        slideshow {
            ...Asset
        }
        youTube
        buttonImages {
            ...CarouselMediaCollection
        }
        teamMember {
            ...TeamMember
        }
        slug
    }
`;
