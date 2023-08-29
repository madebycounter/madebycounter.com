import React from "react";
import styled from "styled-components";

import PortfolioItem from "../../types/PortfolioItem";
import { Heading2, Heading3 } from "../Typography";
import Media from "../media/Media";

type PortfolioCardProps = {
    item: PortfolioItem;
};

const StyledPortfolioCard = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.backgroundColor};
`;

export function PortfolioCard({ item }: PortfolioCardProps) {
    return (
        <StyledPortfolioCard>
            <Heading3>{item.title}</Heading3>
            <Media src={item.thumbnail} aspectRatio={16 / 9} />
        </StyledPortfolioCard>
    );
}
