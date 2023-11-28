import { graphql } from "gatsby";

import MediaCollection from "./components/MediaCollection";
import SocialMediaEmbed from "./components/SocialMediaEmbed";

import Asset from "./Asset";
import BlogPost from "./BlogPost";
import PortfolioItem from "./PortfolioItem";

export type RichTextReference =
    | Asset
    | SocialMediaEmbed
    | MediaCollection
    | PortfolioItem
    | BlogPost;

export type RichTextResponse = {
    raw: string;
    assetReferences: (Asset | {})[];
    socialMediaEmbedReferences: (SocialMediaEmbed | {})[];
    mediaCollectionReferences: (MediaCollection | {})[];
    portfolioItemReferences: (PortfolioItem | {})[];
    blogPostReferences: (BlogPost | {})[];
};

export type RichText = {
    raw: string;
    references: RichTextReference[];
};

export function isRef(obj: RichTextReference | {}): obj is RichTextReference {
    console.log(obj, obj.hasOwnProperty("__typename"));
    return obj.hasOwnProperty("__typename");
}

export function packRichText(content: RichTextResponse): RichText {
    return {
        raw: content.raw,
        references: [
            ...content.assetReferences,
            ...content.socialMediaEmbedReferences,
            ...content.mediaCollectionReferences,
            ...content.portfolioItemReferences,
            ...content.blogPostReferences,
        ].filter(isRef),
    };
}
