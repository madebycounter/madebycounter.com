import { BLOCKS, Block, Inline, MARKS } from "@contentful/rich-text-types";
import React, { ReactNode } from "react";
import "react-bootstrap-icons";
import Highlight from "react-highlight";
import { InstagramEmbed } from "react-social-media-embed";
import styled from "styled-components";

import BlogAssetContainer from "../components/BlogAssetContainer";
import MultiImageBlock from "../components/MultiImageBlock";
import {
    Heading1,
    Heading2,
    ListItem,
    OrderedList,
    Paragraph,
    UnorderedList,
} from "../components/Typography";
import { PortfolioCard } from "../components/cards/PortfolioCard";
import Media from "../components/media/Media";
import SocialMediaEmbed from "../types/components/SocialMediaEmbed";

import "../../node_modules/highlight.js/styles/atom-one-dark.css";

const StyledCodeBlock = styled.div`
    font-family: var(--mono-font);
    font-size: 1rem;
`;

const BlogHeading1 = styled(Heading1)`
    font-size: 2rem;
    margin: 1rem 0;
`;

const BlogHeading2 = styled(Heading2)`
    font-size: 1.6rem;
    margin: 1rem 0;
`;

function renderSocialEmbed(node: Block | Inline, children: ReactNode) {
    const { url, platform } = node.data.target as SocialMediaEmbed;

    if (platform === "Instagram") return <InstagramEmbed url={url} />;
    else return <p>Unsupported embed</p>;
}

function renderEntry(node: Block | Inline, children: ReactNode) {
    console.log(node);
    switch (node.data.target.__typename) {
        case "ContentfulBlogPost":
            return <p>Blog posts not supported</p>;
        case "ContentfulPortfolioItem":
            return (
                <PortfolioCard
                    item={{
                        ...node.data.target,
                        description: node.data.target.portfolioDescription,
                    }}
                />
            );
        case "ContentfulSocialMediaEmbed":
            return renderSocialEmbed(node, children);
        case "ContentfulMultiImageBlock":
            return <MultiImageBlock images={node.data.target.images} />;
    }
}

function renderMedia(onClick?: (cfid: string) => void) {
    return (node: Block | Inline, children: ReactNode) => {
        return <Media src={node.data.target} onClick={onClick} />;
    };
}

function blogContainerWrap(func: (...args: any[]) => ReactNode) {
    return function (...args: any[]) {
        return <BlogAssetContainer>{func(...args)}</BlogAssetContainer>;
    };
}

function renderCode(text: string) {
    var language;
    var split = text.split("\n");

    if (split[0].startsWith("#")) language = split[0].substring(1);
    text = split.slice(1).join("\n");

    return (
        <StyledCodeBlock>
            <Highlight className={language}>{text}</Highlight>
        </StyledCodeBlock>
    );
}

export function blogPostOptions(onClick: (cfid: string) => void): any {
    return {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: blogContainerWrap(renderMedia(onClick)),
            [BLOCKS.EMBEDDED_ENTRY]: blogContainerWrap(renderEntry),
            [BLOCKS.HEADING_1]: (node: Block | Inline, children: ReactNode) => {
                return <BlogHeading1>{children}</BlogHeading1>;
            },
            [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
                return <BlogHeading2>{children}</BlogHeading2>;
            },
            [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => {
                return <Paragraph>{children}</Paragraph>;
            },
            [BLOCKS.OL_LIST]: (node: Block | Inline, children: ReactNode) => {
                return <OrderedList>{children}</OrderedList>;
            },
            [BLOCKS.UL_LIST]: (node: Block | Inline, children: ReactNode) => {
                return <UnorderedList>{children}</UnorderedList>;
            },
            [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: ReactNode) => {
                return <ListItem>{children}</ListItem>;
            },
        },
        renderMark: {
            [MARKS.CODE]: blogContainerWrap(renderCode),
        },
    };
}

export const portfolioOptions: any = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => {
            return <>{children}</>;
        },
    },
};
