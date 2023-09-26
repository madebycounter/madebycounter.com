import { IGatsbyImageData } from "gatsby-plugin-image";

export type RichText = any;

export type MetaImage = {
    gatsbyImageData?: IGatsbyImageData;
};

export type TeamMember = "Luke" | "Henry" | "William" | "Counter";

export type HorizontalDirection = "left" | "right";

export type VerticalDirection = "up" | "down";

export type Direction = HorizontalDirection | VerticalDirection;

export interface SiteMetadata {
    title: string;
    siteUrl: string;
    web3forms: string;
    hubspot: string;
}
