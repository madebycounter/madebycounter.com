import { graphql, useStaticQuery } from "gatsby";

import Service from "../Service";

export interface ServicesPage {
    __typename: "ContentfulServicesPage";
    contentful_id: string;
    services: Service[];
}

export function useServicesPage(): ServicesPage {
    return useStaticQuery(graphql`
        {
            contentfulServicesPage {
                __typename
                contentful_id
                services {
                    ...ServiceRef
                }
            }
        }
    `).contentfulServicesPage;
}
