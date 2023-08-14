import React from "react";
import styled from "styled-components";

import { TeamMember } from "../global/types";

import CounterPFP from "../images/authors/counter.png";
import HenryPFP from "../images/authors/henry.png";
import LukePFP from "../images/authors/luke.png";
import WilliamPFP from "../images/authors/william.png";

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
};

const Author = ({ author, date }: AuthorProps) => {
    return (
        <StyledAuthor>
            <img src={getProfilePhoto(author)} alt="" />

            <span>
                Written by {author}
                <br />
                {date}
            </span>
        </StyledAuthor>
    );
};

export default Author;
