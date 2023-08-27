import { graphql, useStaticQuery } from "gatsby";

import Service from "../Service";

export interface ServicesPage {
    services: Service[];
}

export function useServicesPage(): ServicesPage {
    return useStaticQuery(graphql`
        {
            contentfulServicesPage {
                services {
                    ...Service
                }
            }
        }
    `).contentfulServicesPage;
}
