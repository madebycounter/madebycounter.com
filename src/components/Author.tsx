import React from "react";
import styled from "styled-components";

import { Direction, TeamMember } from "../types";
import ProfilePhoto from "./ProfilePhoto";
import { Paragraph } from "./Typography";

type StyledAuthorProps = {
    $direction: Direction.LEFT | Direction.RIGHT;
};

const StyledAuthor = styled.div<StyledAuthorProps>`
    display: flex;
    align-items: last baseline;
    justify-content: flex-start;
    font-size: 1rem;
    gap: 0.5em;

    flex-direction: ${({ $direction }) =>
        $direction === Direction.LEFT ? "row" : "row-reverse"};

    color: ${({ theme }) => theme.color};

    img {
        width: 2.8em;
    }

    ${Paragraph} {
        font-size: inherit;
        text-align: ${({ $direction }) =>
            $direction === Direction.LEFT ? "left" : "right"};
        font-weight: 300;
        line-height: 1.3em;
        margin: 0;
    }
`;

type AuthorProps = {
    author: TeamMember;
    date: string;
    className?: string;
    direction?: Direction.LEFT | Direction.RIGHT;
};

const Author = ({
    author,
    date,
    className,
    direction = Direction.LEFT,
}: AuthorProps) => {
    return (
        <StyledAuthor className={className} $direction={direction}>
            <ProfilePhoto member={author} />

            <div>
                <Paragraph>Written by {author}</Paragraph>
                <Paragraph>{date}</Paragraph>
            </div>
        </StyledAuthor>
    );
};

export default Author;
