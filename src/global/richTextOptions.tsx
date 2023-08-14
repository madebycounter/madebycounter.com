import { BLOCKS, Block, Inline, MARKS } from "@contentful/rich-text-types";
import React, { ReactNode } from "react";
import { CodeBlock, vs2015 } from "react-code-blocks";
import { InstagramEmbed } from "react-social-media-embed";
import styled from "styled-components";

import Media from "../components/media/Media";

const StyledCodeBlock = styled.div`
    font-family: var(--mono-font);
    font-size: 1rem;
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
            // if (platform === "YouTube") return <YouTube url={url} />;
            else return <p>Unsupported embed</p>;
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
