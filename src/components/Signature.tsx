import React from "react";
import styled from "styled-components";

import TeamMember from "../types/components/TeamMember";

import HenrySignature from "../images/signatures/henry.webp";
import LukeSignature from "../images/signatures/luke.webp";
import WilliamSignature from "../images/signatures/william.webp";

const StyledImage = styled.img`
    filter: ${({ theme }) => theme.imageFilter};
    width: 100%;
`;

type SignatureProps = {
    name: TeamMember;
    className?: string;
};

function chooseSignature(teamMember: TeamMember) {
    switch (teamMember.fullName) {
        case "Luke A. Makinson":
            return LukeSignature;
        case "William Gardner":
            return WilliamSignature;
        case "Henry Buck":
            return HenrySignature;
    }
}

const Signature = ({ name, className }: SignatureProps) => {
    return <StyledImage className={className} src={chooseSignature(name)} />;
};

export default Signature;
