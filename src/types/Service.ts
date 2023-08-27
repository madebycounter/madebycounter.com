import { graphql, useStaticQuery } from "gatsby";

import Asset from "./Asset";

export default interface Service {
    contentful_id: string;
    title: string;
    offerings: string[];
    slideshow?: Asset[];
    youTube?: string;
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
        contentful_id
        title
        offerings
        slideshow {
            ...Asset
        }
        youTube
        slug
    }
`;
