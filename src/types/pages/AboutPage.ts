import { graphql, useStaticQuery } from "gatsby";

import Asset from "../Asset";
import PortfolioItem from "../PortfolioItem";

export interface AboutPage {
    lukeSlideshow1: Asset[];
    lukeSlideshow2: Asset[];
    williamSlideshow1: Asset[];
    williamSlideshow2: Asset[];
    henrySlideshow1: Asset[];
    henrySlideshow2: Asset[];
    lukePortrait: Asset;
    henryPortrait: Asset;
    williamPortrait: Asset;
    dronePortrait: Asset;
    footerPortraits: Asset[];
    lukeShowcase: PortfolioItem[];
    henryShowcase: PortfolioItem[];
    williamShowcase: PortfolioItem[];
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
                lukePortrait {
                    ...Asset
                }
                henryPortrait {
                    ...Asset
                }
                williamPortrait {
                    ...Asset
                }
                dronePortrait {
                    ...Asset
                }
                footerPortraits {
                    ...Asset
                }
                lukeShowcase {
                    ...PortfolioItem
                }
                henryShowcase {
                    ...PortfolioItem
                }
                williamShowcase {
                    ...PortfolioItem
                }
            }
        }
    `).contentfulAboutPage;
}
