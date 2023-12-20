import React from "react";
import styled from "styled-components";

import Asset from "../types/Asset";
import Media from "./media/Media";

const StyledMultiImageBlock = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    gap: 1rem;

    > div {
        flex: 1 0;
        height: 100% !important;
    }
`;

type MultiImageBlockProps = {
    images: Asset[];
    onClick?: (cfid: string) => void;
};

export default function MultiImageBlock({
    images,
    onClick,
}: MultiImageBlockProps) {
    const aspectRatio =
        images[0].dimensions.width / images[0].dimensions.height;

    return (
        <StyledMultiImageBlock>
            {images.map((image, idx) => (
                <Media
                    key={idx}
                    src={image}
                    aspectRatio={aspectRatio}
                    onClick={onClick}
                />
            ))}
        </StyledMultiImageBlock>
    );
}
