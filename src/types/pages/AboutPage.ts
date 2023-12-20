import { graphql, useStaticQuery } from "gatsby";

import PortfolioItem from "../PortfolioItem";
import Service from "../Service";
import MediaCollection from "../collections/MediaCollection";

export interface AboutPage {
    __typename: "ContentfulAsset";
    contentful_id: string;
    lukeShowcase: PortfolioItem[];
    henryShowcase: PortfolioItem[];
    williamShowcase: PortfolioItem[];
    lukeSlideshows: MediaCollection[];
    henrySlideshows: MediaCollection[];
    williamSlideshows: MediaCollection[];
    lukeService: Service;
    henryService: Service;
    williamService: Service;
    heroMedia: MediaCollection[];
}

export function useAboutPage(): AboutPage {
    return useStaticQuery(graphql`
        {
            contentfulAboutPage {
                lukeShowcase {
                    ...PortfolioItem
                }
                henryShowcase {
                    ...PortfolioItem
                }
                williamShowcase {
                    ...PortfolioItem
                }
                lukeSlideshows {
                    ...MediaCollectionSmall
                }
                henrySlideshows {
                    ...MediaCollectionSmall
                }
                williamSlideshows {
                    ...MediaCollectionSmall
                }
                lukeService {
                    ...Service
                }
                henryService {
                    ...Service
                }
                williamService {
                    ...Service
                }
                heroMedia {
                    ...MediaCollectionSmall
                }
            }
        }
    `).contentfulAboutPage;
}
