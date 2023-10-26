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

type GalleryProps = {
    images: Asset[];
    gap?: number;
    onClick?: (src: string) => void;
};

export default function Gallery({ images, gap = 8, onClick }: GalleryProps) {
    const [ref, size] = useSize<HTMLDivElement>();
    const [columns, setColums] = useState(2);

    useEffect(() => {
        if (size.width < 700) setColums(1);
        else if (size.width < 1200) setColums(2);
        else setColums(3);
    }, [size]);

    var cols = arrangeImages(images, columns, size.width, gap);

    return (
        <StyledGallery $gap={gap} ref={ref}>
            {cols.map((col, i) => (
                <div key={i}>
                    {col.images.map((imgData, j) => (
                        <div key={j}>
                            <Media
                                src={imgData.asset}
                                aspectRatio={
                                    imgData.normalDimensions.width /
                                    imgData.normalDimensions.height
                                }
                                onClick={onClick}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </StyledGallery>
    );
}

type ColumnImage = {
    asset: Asset;
    normalDimensions: { width: number; height: number };
};

type Column = {
    images: ColumnImage[];
    height: number;
};

function arrangeImages(
    images: Asset[],
    columns: number,
    width: number,
    gap: number,
) {
    // Find column width
    var columnWidth = (width - gap * (columns - 1)) / columns;

    // Convert assets to ColumnImage
    var columnImages: ColumnImage[] = images.map((img) => {
        var aspectRatio = img.dimensions.width / img.dimensions.height;

        return {
            asset: img,
            normalDimensions: {
                width: columnWidth,
                height: columnWidth / aspectRatio,
            },
        };
    });

    // Sort images by normalized height
    columnImages.sort(
        (a, b) => a.normalDimensions.height - b.normalDimensions.height,
    );

    // Create array of columns
    var cols: Column[] = [];
    for (let i = 0; i < columns; i++) cols.push({ images: [], height: 0 });

    // Add images to shortest column until all images are added
    for (let i = 0; i < columnImages.length; i++) {
        var img = columnImages[i];
        var shortestColumn = cols.reduce((prev, curr) =>
            prev.height < curr.height ? prev : curr,
        );

        shortestColumn.images.push(img);
        shortestColumn.height += img.normalDimensions.height;
    }

    // Adjust column heights by gap according to image count
    for (let i = 0; i < columns; i++) {
        var col = cols[i];
        col.height += gap * (col.images.length - 1);
    }

    // Find average column height
    var averageHeight =
        cols.reduce((prev, curr) => prev + curr.height, 0) / columns;

    // Adjust image height to match average column height
    for (let i = 0; i < columns; i++) {
        var col = cols[i];
        var diff = (averageHeight - col.height) / col.images.length;

        for (let j = 0; j < col.images.length; j++) {
            col.images[j].normalDimensions.height += diff;
        }
    }

    // Shuffle images deterministically
    for (let i = 0; i < columns; i++) {
        cols[i].images = shuffle(cols[i].images, 1);
    }

    return cols;
}

// https://github.com/yixizhang/seed-shuffle/blob/master/index.js
function shuffle(array: any[], seed: number) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;
    seed = seed || 1;
    let random = function () {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
