import React from "react";
import styled from "styled-components";

import Asset from "../../types/Asset";
import { ImageCarousel } from "../Carousel";

const ImageGridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto 300px;
    grid-template-areas: "column1 column2 column3" "row row row";
    gap: 8px;

    width: 100%;
    height: 800px;

    @media (max-width: 1500px) {
        grid-template-rows: auto 200px;
        height: 600px;
    }

    @media (max-width: 600px) {
        grid-template-rows: auto 120px;
        height: 400px;
    }
`;

type GridAreaProps = {
    $area: string;
};

const GridArea = styled.div<GridAreaProps>`
    grid-area: ${(props) => props.$area};
    min-width: 0;
    min-height: 0;
    width: 100%;
    height: 100%;
`;

type ImageGridProps = {
    column1: Asset[];
    column2: Asset[];
    column3: Asset[];
    row: Asset[];
};

export default function ImageGrid({
    column1,
    column2,
    column3,
    row,
}: ImageGridProps) {
    return (
        <ImageGridWrapper>
            <GridArea $area="column1">
                <ImageCarousel images={column1} direction="up" />
            </GridArea>

            <GridArea $area="column2">
                <ImageCarousel images={column2} direction="down" />
            </GridArea>

            <GridArea $area="column3">
                <ImageCarousel images={column3} direction="up" />
            </GridArea>

            <GridArea $area="row">
                <ImageCarousel images={row} direction="right" />
            </GridArea>
        </ImageGridWrapper>
    );
}
