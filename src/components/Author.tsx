import React from "react";
import styled from "styled-components";

import CounterPFP from "../images/authors/counter.webp";
import HenryPFPCropped from "../images/authors/henry-crop.webp";
import HenryPFP from "../images/authors/henry.webp";
import LukePFPCropped from "../images/authors/luke-crop.webp";
import LukePFP from "../images/authors/luke.webp";
import WilliamPFPCropped from "../images/authors/william-crop.webp";
import WilliamPFP from "../images/authors/william.webp";

import { HorizontalDirection, TeamMember } from "../types";
import { Paragraph } from "./Typography";

export function getFullName(author: TeamMember) {
    switch (author) {
        case "Counter":
            return "Counter";
        case "Henry":
            return "Henry Buck";
        case "Luke":
            return "Luke A. Makinson";
        case "William":
            return "William Gardner";
    }
}

function getProfilePhoto(author: TeamMember, cropped: boolean = false) {
    if (cropped) {
        switch (author) {
            case "Counter":
                return CounterPFP;
            case "Henry":
                return HenryPFPCropped;
            case "Luke":
                return LukePFPCropped;
            case "William":
                return WilliamPFPCropped;
        }
    } else {
        switch (author) {
            case "Counter":
                return CounterPFP;
            case "Henry":
                return HenryPFP;
            case "Luke":
                return LukePFP;
            case "William":
                return WilliamPFP;
        }
    }
}

const StyledImage = styled.img`
    width: 100%;
`;

export function ProfilePhoto({
    member,
    className,
    cropped = false,
}: {
    member: TeamMember;
    className?: string;
    cropped?: boolean;
}) {
    return (
        <StyledImage
            className={className}
            src={getProfilePhoto(member, cropped)}
            alt={`Photo of ${member}`}
        />
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

    img {
        width: 2.8em;
    }

    ${Paragraph} {
        font-size: inherit;
        text-align: ${({ $direction }) =>
            $direction === "left" ? "left" : "right"};
        font-weight: 300;
        line-height: 1.3em;
        margin: 0;
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
            <ProfilePhoto member={author} />

            <div>
                <Paragraph>Written by {author}</Paragraph>
                <Paragraph>{date}</Paragraph>
            </div>
        </StyledAuthorCard>
    );
}
