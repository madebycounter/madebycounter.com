import React from "react";
import styled from "styled-components";

import { MediaData } from "../../global/types";

import Media from "./Media";

const StyledGallery = styled.div`
    --gap: 1rem;

    @media (max-width: 700px) {
        --gap: 0.5rem;
    }

    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);

    color: ${({ theme }) => theme.color};
    background-color: ${({ theme }) => theme.backgroundColor};

    > div {
        flex: 1;
    }

    > div > div {
        margin: var(--gap) 0;
    }
`;

type GalleryProps = {
    images: MediaData[];
    onClick: (src: string) => void;
};

const Gallery = ({ images, onClick }: GalleryProps) => {
    var col1 = [];
    var col2 = [];

    if (images) {
        for (let i = 0; i < images.length; i += 2) col1.push(images[i]);
        for (let i = 1; i < images.length; i += 2) col2.push(images[i]);
    }

    return (
        <StyledGallery>
            <div>
                {col1.map((img, idx) => (
                    <div key={idx}>
                        <Media src={img} onClick={onClick} />
                    </div>
                ))}
            </div>

            <div>
                {col2.map((img, idx) => (
                    <div key={idx}>
                        <Media src={img} onClick={onClick} />
                    </div>
                ))}
            </div>
        </StyledGallery>
    );
};

export default Gallery;
