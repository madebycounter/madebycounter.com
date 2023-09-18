import classnames from "classnames";
import React from "react";
import styled from "styled-components";

import useContainerQuery from "../../global/containerQuery";
import { smartShorten } from "../../global/textHelpers";

import BlogPost from "../../types/BlogPost";
import Author from "../Author";
import { Heading2, Heading3, Paragraph, Tags } from "../Typography";
import Media, { ResizeMode } from "../media/Media";
import LinkDiv from "./utils/LinkDiv";
import Slash from "./utils/Slash";

type BlogEmbedProps = {
    item: BlogPost;
};

const StyledEmbedAuthor = styled(Author)`
    margin: 0.5rem 0;
    margin-bottom: 0;
    font-size: 1.1rem;
`;

const StyledEmbedImage = styled(LinkDiv)`
    position: relative;

    ${Slash} {
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
    }
`;

const StyledEmbedInfo = styled(LinkDiv)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5rem;

    > div > ${Paragraph} {
        font-size: 1rem;
        margin: 0.5rem 0;
    }
`;

const StyledEmbed = styled.div`
    margin: 2rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;

    background-color: ${(props: any) => props.theme.backgroundColor};
    color: ${(props: any) => props.theme.color};

    box-shadow: 3px 3px 13px 0px rgba(0, 0, 0, 0.15);

    ${Tags} {
        margin: 0.5rem 0;
    }

    &.small {
        grid-template-columns: 3fr 2fr;

        ${StyledEmbedInfo} > div > ${Paragraph} {
            display: none;
        }

        ${Heading2} {
            font-size: 1.4rem;
        }

        ${StyledEmbedAuthor} {
            font-size: 0.9rem;
        }
    }

    .media-wrapper {
        transform: scale(1);
        transition: transform 0.1s ease-in-out;
    }

    &:hover .media-wrapper {
        transform: scale(1.05);
    }
`;

export function BlogEmbed({ item }: BlogEmbedProps) {
    const [matches, ref] = useContainerQuery<HTMLDivElement>({
        small: {
            max: 600,
        },
    });

    return (
        <StyledEmbed ref={ref} className={classnames(matches)}>
            <StyledEmbedInfo to={`/blog/${item.slug}`}>
                <div>
                    <Heading2>{item.title}</Heading2>

                    <Paragraph>
                        {smartShorten(item.description?.description || "", 350)}
                        {/* <FadeOutText /> */}
                    </Paragraph>
                </div>

                <StyledEmbedAuthor author={item.author} date={item.date} />
            </StyledEmbedInfo>

            <StyledEmbedImage to={`/blog/${item.slug}`}>
                <Media src={item.banner} resizeMode={ResizeMode.Fill} />

                <Slash />
            </StyledEmbedImage>
        </StyledEmbed>
    );
}
