import { graphql, useStaticQuery } from "gatsby";

import Asset from "../Asset";

export interface AboutPage {
    lukeSlideshow1: Asset[];
    lukeSlideshow2: Asset[];
    williamSlideshow1: Asset[];
    williamSlideshow2: Asset[];
    henrySlideshow1: Asset[];
    henrySlideshow2: Asset[];
}

export function useAboutPage(): AboutPage {
    return useStaticQuery(graphql`
        {
            contentfulAboutPage {
                lukeSlideshow1 {
                    ...Asset
                }
                lukeSlideshow2 {
                    ...Asset
                }
                williamSlideshow1 {
                    ...Asset
                }
                williamSlideshow2 {
                    ...Asset
                }
                henrySlideshow1 {
                    ...Asset
                }
                henrySlideshow2 {
                    ...Asset
                }
            }
        }
    `).contentfulAboutPage;
}
