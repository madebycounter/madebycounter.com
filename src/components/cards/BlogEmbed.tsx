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
        max-height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
    }

    ${Heading3} {
        text-decoration: underline;
        padding-right: 1rem;
    }
`;

const SideBySide = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledEmbed = styled.div`
    margin: 2rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;

    width: 100%;

    background-color: ${(props: any) => props.theme.backgroundColor};
    color: ${(props: any) => props.theme.color};

    box-shadow: 3px 3px 13px 0px rgba(0, 0, 0, 0.15);

    ${Tags} {
        margin: 0.5rem 0;
    }

    &.medium {
        grid-template-columns: 1fr 1fr;

        ${StyledEmbedInfo} {
            justify-content: flex-start;

            > div > ${Paragraph}, ${Heading3} {
                display: none;
            }
        }

        ${StyledEmbedAuthor} {
            font-size: 1.2rem;
        }
    }

    &.small {
        grid-template-columns: 3fr 2fr;

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

    &:hover {
        .media-wrapper {
            transform: scale(1.05);
        }
    }
`;

export function BlogEmbed({ item }: BlogEmbedProps) {
    const [matches, ref] = useContainerQuery<HTMLDivElement>({
        medium: {
            max: 730,
        },
        small: {
            max: 500,
        },
    });

    return (
        <StyledEmbed ref={ref} className={classnames(matches)}>
            <StyledEmbedInfo to={`/blog/${item.slug}`}>
                <div>
                    <Heading2>{item.title}</Heading2>

                    <Paragraph>
                        {smartShorten(item.content, 350)}
                        {/* <FadeOutText /> */}
                    </Paragraph>
                </div>

                <SideBySide>
                    <StyledEmbedAuthor author={item.author} date={item.date} />
                    <Heading3>Read More</Heading3>
                </SideBySide>
            </StyledEmbedInfo>

            <StyledEmbedImage to={`/blog/${item.slug}`}>
                <Media src={item.banner} resizeMode={ResizeMode.Fill} />

                <Slash />
            </StyledEmbedImage>
        </StyledEmbed>
    );
}
