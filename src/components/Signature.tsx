import React from "react";
import styled from "styled-components";

import HenrySignature from "../images/about/henry-signature.png";
import LukeSignature from "../images/about/luke-signature.png";
import WilliamSignature from "../images/about/william-signature.png";

import { TeamMember } from "../types";

const StyledImage = styled.img`
    filter: ${({ theme }) => theme.imageFilter};
    width: 100%;
`;

type SignatureProps = {
    name: TeamMember;
    className?: string;
};

function chooseSignature(name: TeamMember) {
    switch (name) {
        case "Luke":
            return LukeSignature;
        case "William":
            return WilliamSignature;
        case "Henry":
            return HenrySignature;
    }
}

const Signature = ({ name, className }: SignatureProps) => {
    return <StyledImage className={className} src={chooseSignature(name)} />;
};

export default Signature;
