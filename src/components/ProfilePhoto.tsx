import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";

// import CounterPFP from "../images/authors/counter.webp";
// import HenryPFP from "../images/authors/henry.webp";
import LukePFP from "../images/authors/luke.png";

// import WilliamPFP from "../images/authors/william.webp";
import { TeamMember } from "../types";

// function getProfilePhoto(author: TeamMember) {
//     switch (author) {
//         case "Counter":
//             return CounterPFP;
//         case "Henry":
//             return HenryPFP;
//         case "Luke":
//             return LukePFP;
//         case "William":
//             return WilliamPFP;
//     }
// }

const StyledImage = styled.img`
    aspect-ratio: 1;
`;

export default function ProfilePhoto({
    member,
    className,
}: {
    member: TeamMember;
    className?: string;
}) {
    return (
        <StyledImage
            className={className}
            // src={getProfilePhoto(member)}
            src={LukePFP}
            alt={`Photo of ${member}`}
        />
    );
}
