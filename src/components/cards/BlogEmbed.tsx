import { match } from "assert";
import classnames from "classnames";
import React from "react";
import styled from "styled-components";

import useContainerQuery from "../../global/containerQuery";
import { renderPlainText, smartShorten } from "../../global/textHelpers";

import BlogPost from "../../types/BlogPost";
import Author from "../Author";
import { Heading2, Heading3, Paragraph, Tags } from "../Typography";
import Media, { ResizeMode } from "../media/Media";
import FadeOutText from "./utils/FadeOutText";
import LinkDiv from "./utils/LinkDiv";
import Slash from "./utils/Slash";

type BlogEmbedProps = {
    item: BlogPost;
};

const StyledEmbedAuthor = styled(Author)`
    margin: 0.5rem 0;
    margin-bottom: 0;
`;

const StyledEmbedImage = styled(LinkDiv)`
    position: relative;

    img {
        transform: scale(1.08);

        /* opacity transition copied as to not override gatsby-image behaviour */
        /* could probably make a seperate div layer to do this but this is far easier lol */
        transition:
            transform 0.1s ease-in-out,
            opacity 0.25s linear !important;
    }

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

    &.small {
        grid-template-columns: 1fr 200px;

        ${Heading2} {
            font-size: 1.6rem;
        }

        ${StyledEmbedInfo} {
            > div > ${Paragraph}, ${Heading3} {
                display: none;
            }
        }
    }

    &:hover {
        ${StyledEmbedImage} img {
            transform: scale(1.08);
        }
    }
`;

export function BlogEmbed({ item }: BlogEmbedProps) {
    const [matches, ref] = useContainerQuery<HTMLDivElement>({
        small: {
            max: 730,
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
