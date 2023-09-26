import React from "react";
import styled from "styled-components";

import { Direction } from "../../types";
import BlogPost from "../../types/BlogPost";
import { ProfilePhoto, getFullName } from "../Author";
import { Heading2, Tags } from "../Typography";
import Media from "../media/Media";
import LinkDiv from "./utils/LinkDiv";
import Overlay from "./utils/Overlay";
import Slash from "./utils/Slash";

type BlogCardProps = {
    item: BlogPost;
};

const StyledAuthorContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0.5rem;

    width: 8rem;
    height: 8rem;

    z-index: 10;

    img {
        width: 100%;
        filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 1));
    }
`;

const StyledCard = styled(LinkDiv)`
    position: relative;
    overflow: hidden;

    ${Heading2} {
        position: absolute;
        color: ${(props) => props.theme.backgroundColor};
        z-index: 10;

        top: 0;
        left: 0;
        width: calc(100% - 1rem);
        margin: 0.5rem;

        font-size: 2rem;
        text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }

    ${Tags} {
        position: absolute;
        color: ${(props) => props.theme.backgroundColor};
        bottom: 0;
        left: 0;
        margin: 0.5rem;
        z-index: 10;
        font-size: 1.2rem;
        line-height: 1.1em;

        text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    }

    .media-wrapper {
        filter: blur(2px);
        transform: scale(1);
        transition: transform 0.1s ease-in-out;
    }

    ${Overlay} {
        opacity: 0.2;
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

export function BlogCard({ item }: BlogCardProps) {
    return (
        <StyledCard to={`/blog/${item.slug}`}>
            <Media src={item.banner} aspectRatio={4 / 3} />

            <Overlay />

            <Heading2>{item.title}</Heading2>

            <Tags>
                {getFullName(item.author)}
                <br />
                {item.dateDotted}
            </Tags>

            <StyledAuthorContainer>
                <ProfilePhoto member={item.author} />
            </StyledAuthorContainer>
        </StyledCard>
    );
}
