import React from "react";
import styled from "styled-components";

import CounterPFP from "../images/authors/counter.webp";
import HenryPFP from "../images/authors/henry.webp";
import LukePFP from "../images/authors/luke.webp";
import WilliamPFP from "../images/authors/william.webp";

import { TeamMember } from "../types";
import { Paragraph } from "./Typography";

const StyledAuthor = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    margin: 1rem 0;

    color: ${({ theme }) => theme.color};
    background-color: ${({ theme }) => theme.backgroundColor};

    img {
        border-radius: 50%;
        max-width: 3rem;
    }

    ${Paragraph} {
        font-size: 1rem;
        font-weight: 400;
        margin: 0;
    }
`;

function getProfilePhoto(author: TeamMember) {
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

type AuthorProps = {
    author: TeamMember;
    date: string;
    className?: string;
};

const Author = ({ author, date, className }: AuthorProps) => {
    return (
        <StyledAuthor className={className}>
            <img src={getProfilePhoto(author)} alt="" />

            <Paragraph>
                Written by {author}
                <br />
                {date}
            </Paragraph>
        </StyledAuthor>
    );
};

export default Author;
