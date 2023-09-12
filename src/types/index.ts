import { IGatsbyImageData } from "gatsby-plugin-image";

export type RichText = any;

export type MetaImage = {
    gatsbyImageData?: IGatsbyImageData;
};

export type TeamMember = "Luke" | "Henry" | "William" | "Counter";

export enum Direction {
    LEFT,
    RIGHT,
    UP,
    DOWN,
}

export interface SiteMetadata {
    title: string;
    siteUrl: string;
    web3forms: string;
    hubspot: string;
}
