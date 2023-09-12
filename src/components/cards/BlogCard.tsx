import React from "react";
import styled from "styled-components";

import { Direction } from "../../types";
import BlogPost from "../../types/BlogPost";
import Author from "../Author";
import { Heading2, Paragraph, Tags } from "../Typography";
import Media from "../media/Media";
import LinkDiv from "./utils/LinkDiv";
import Overlay from "./utils/Overlay";
import Slash from "./utils/Slash";

type BlogCardProps = {
    item: BlogPost;
};

const StyledCard = styled(LinkDiv)`
    position: relative;
    --margin: 0.5rem;

    ${Heading2} {
        position: absolute;
        color: ${(props) => props.theme.backgroundColor};
        top: var(--margin);
        left: var(--margin);
        z-index: 10;
        width: calc(100% - (2 * var(--margin)));

        font-size: 4rem;

        text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    }

    .media-wrapper {
        filter: blur(2px);
        transform: scale(1);
        transition: transform 0.1s ease-in-out;
    }

    ${Overlay} {
        opacity: 0.3;
        transition: opacity 0.1s ease-in-out;
    }

    &:hover {
        ${Overlay} {
            opacity: 0;
        }

        .media-wrapper {
            filter: blur(2px);
            transform: scale(1.05);
        }
    }
`;

const StyledCardAuthor = styled(Author)`
    font-size: 1.4rem;
`;

const StyledCardAuthorBox = styled.div`
    padding: 0.8rem 0.8rem;
    position: absolute;
    bottom: 2rem;
    right: 0;
    z-index: 10;

    background-color: ${(props) => props.theme.backgroundColor};

    ${Slash} {
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        transform: translateX(-100%);
    }
`;

export function BlogCard({ item }: BlogCardProps) {
    return (
        <StyledCard to={`/blog/${item.slug}`}>
            <Media src={item.banner} aspectRatio={4 / 3} />

            <Overlay />

            <Heading2>{item.title}</Heading2>

            <StyledCardAuthorBox>
                <StyledCardAuthor
                    direction={Direction.RIGHT}
                    author={item.author}
                    date={item.date}
                />

                <Slash direction={Direction.RIGHT} />
            </StyledCardAuthorBox>
        </StyledCard>
    );
}
