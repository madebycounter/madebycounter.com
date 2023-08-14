import { BLOCKS, Block, Inline, MARKS } from "@contentful/rich-text-types";
import React, { ReactNode } from "react";
import "react-bootstrap-icons";
import { CodeBlock, vs2015 } from "react-code-blocks";
import { InstagramEmbed } from "react-social-media-embed";
import styled from "styled-components";

import {
    Heading1,
    Heading2,
    Heading3,
    Paragraph,
} from "../components/Typography";
import Media, { ResizeMode } from "../components/media/Media";

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

const richTextOptions: any = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (
            node: Block | Inline,
            children: ReactNode,
        ) => {
            return <Media src={node.data.target} />;
        },
        [BLOCKS.EMBEDDED_ENTRY]: (
            node: Block | Inline,
            children: ReactNode,
        ) => {
            const { url, platform } = node.data.target;

            if (platform === "Instagram") return <InstagramEmbed url={url} />;
            else return <p>Unsupported embed</p>;
        },
        [BLOCKS.HEADING_1]: (node: Block | Inline, children: ReactNode) => {
            return <BlogHeading1>{children}</BlogHeading1>;
        },
        [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
            return <BlogHeading2>{children}</BlogHeading2>;
        },
        [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => {
            return <Paragraph>{children}</Paragraph>;
        },
    },
    renderMark: {
        [MARKS.CODE]: (text: string) => {
            var language;
            var split = text.split("\n");

            if (split[0].startsWith("#")) language = split[0].substring(1);
            text = split.slice(1).join("\n");

            // TODO: Fix this
            return (
                <StyledCodeBlock>
                    {/* <CodeBlock
                        text={text}
                        language={language}
                        showLineNumbers={true}
                        theme={vs2015}
                    /> */}
                </StyledCodeBlock>
            );
        },
    },
};

export default richTextOptions;
