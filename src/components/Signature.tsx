import React from "react";
import styled from "styled-components";

import { TeamMember } from "../global/types";

import HenrySignature from "../images/about/henry-signature.png";
import LukeSignature from "../images/about/luke-signature.png";
import WilliamSignature from "../images/about/william-signature.png";

const StyledImage = styled.img`
    filter: ${({ theme }) => theme.imageFilter};
    width: 100%;
`;

type SignatureProps = {
    name: TeamMember;
};

function chooseSignature(name: TeamMember) {
    switch (name) {
        case TeamMember.Luke:
            return LukeSignature;
        case TeamMember.William:
            return WilliamSignature;
        case TeamMember.Henry:
            return HenrySignature;
    }
}

const Signature = ({ name }: SignatureProps) => {
    return <StyledImage src={chooseSignature(name)} />;
};

export default Signature;
