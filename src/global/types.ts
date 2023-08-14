export interface MediaData {
    contentful_id: string;
    title: string;
    description: string;
    mimeType: string;
    publicUrl: string;
    dimensions: { width: number; height: number };
    gatsbyImageData?: import("gatsby-plugin-image").IGatsbyImageData;
}

export interface SlideshowData {
    contentful_id: string;
    autoplayDelay: number;
    autoplayOffset: number;
    autoplay: boolean;
    content: MediaData[];
}

export interface PortfolioData {
    contentful_id: string;
    title: string;
    date: string;
    tags: string[];
    slug: string;
    description: { description: string };
    thumbnail: MediaData;
    slideshow?: MediaData[];
    gallery?: MediaData[];
    youtube?: string;
}

export interface ServiceData {
    contentful_id: string;
    name: string;
    description: any;
    youTube?: string;
    slideshow?: SlideshowData;
}

export interface BlogPostData {
    contentful_id: string;
    author: TeamMember;
    date: string;
    title: string;
    slug: string;
    content: any;
    banner: MediaData;
    bannerMiddle: number;
}

export type TeamMember = "Luke" | "Henry" | "William" | "Counter";

export enum Direction {
    Left,
    Right,
    Up,
    Down,
}
