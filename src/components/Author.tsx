import React from "react";
import styled from "styled-components";

import TeamMember from "../types/components/TeamMember";

import { HorizontalDirection } from "../types/directions";
import { Paragraph } from "./Typography";
import Media from "./media/Media";

export function getShortName(author: TeamMember) {
    return author.fullName.split(" ")[0];
}

type ProfilePhotoProps = {
    teamMember: TeamMember;
};

const ProfilePhotoWrapper = styled.div`
    width: 100%;
    aspect-ratio: 1;
    position: relative;
`;

const ProfilePhotoMedia = styled(Media)`
    position: absolute;
    left: 0;
    bottom: 0;
`;

export function ProfilePhoto({ teamMember }: ProfilePhotoProps) {
    return (
        <ProfilePhotoWrapper>
            <ProfilePhotoMedia src={teamMember.profilePicture} />
        </ProfilePhotoWrapper>
    );
}

type StyledAuthorCardProps = {
    $direction: HorizontalDirection;
};

const StyledAuthorCard = styled.div<StyledAuthorCardProps>`
    display: flex;
    align-items: last baseline;
    justify-content: flex-start;
    font-size: 1rem;
    gap: 0.5em;

    flex-direction: ${({ $direction }) =>
        $direction === "left" ? "row" : "row-reverse"};

    color: ${({ theme }) => theme.color};

    ${Paragraph} {
        font-size: inherit;
        text-align: ${({ $direction }) =>
            $direction === "left" ? "left" : "right"};
        font-weight: 300;
        line-height: 1.3em;
        margin: 0;
    }

    > :first-child {
        width: 2.8em;
    }
`;

type AuthorCardProps = {
    author: TeamMember;
    date: string;
    className?: string;
    direction?: HorizontalDirection;
};

export function AuthorCard({
    author,
    date,
    className,
    direction = "left",
}: AuthorCardProps) {
    return (
        <StyledAuthorCard className={className} $direction={direction}>
            <div>
                <ProfilePhoto teamMember={author} />
            </div>

            <div>
                <Paragraph>Written by {getShortName(author)}</Paragraph>
                <Paragraph>{date}</Paragraph>
            </div>
        </StyledAuthorCard>
    );
}
