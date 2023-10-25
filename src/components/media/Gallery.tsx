import React, { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";

import useSize from "../../global/useSize";

import Asset from "../../types/Asset";
import Media from "./Media";

const StyledGallery = styled.div<{ $gap: number }>`
    --gap: ${(props) => props.$gap}px;

    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);

    color: ${({ theme }) => theme.color};
    background-color: ${({ theme }) => theme.backgroundColor};

    > div {
        flex: 1;
    }

    > div {
        > div {
            margin: var(--gap) 0;
        }

        > :first-child {
            margin-top: 0;
        }

        > :last-child {
            margin-bottom: 0;
        }
    }
`;

type FixedGalleryProps = {
    images: Asset[];
    columns: number;
    gap?: number;
    onClick?: (src: string) => void;
};

const FixedGallery = forwardRef(
    (
        { images, columns, gap = 8, onClick }: FixedGalleryProps,
        ref: React.Ref<HTMLDivElement>,
    ) => {
        var cols: Asset[][] = [];
        for (let i = 0; i < columns; i++) cols.push([]);

        if (images) {
            for (let i = 0; i < images.length; i++)
                cols[i % columns].push(images[i]);
        }

        return (
            <StyledGallery $gap={gap} ref={ref}>
                {cols.map((col, i) => (
                    <div key={i}>
                        {col.map((img, j) => (
                            <div key={j}>
                                <Media src={img} onClick={onClick} />
                            </div>
                        ))}
                    </div>
                ))}
            </StyledGallery>
        );
    },
);

type GalleryProps = {
    images: Asset[];
    gap?: number;
    onClick?: (src: string) => void;
};

export default function Gallery({ images, gap, onClick }: GalleryProps) {
    const [ref, size] = useSize<HTMLDivElement>();
    const [columns, setColums] = useState(2);

    useEffect(() => {
        if (size.width < 700) setColums(1);
        else if (size.width < 1200) setColums(2);
        else setColums(3);
    }, [size]);

    return (
        <FixedGallery
            columns={columns}
            images={images}
            gap={gap}
            onClick={onClick}
            ref={ref}
        />
    );
}
