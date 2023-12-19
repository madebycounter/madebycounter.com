import React, { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import setRef from "../../global/setRef";
import useSize from "../../global/useSize";

import Asset from "../../types/Asset";
import Media from "./Media";

type StyledGalleryProps = {
    $gap: number;
    $columnWidth: number;
    $width: number;
};

const StyledGallery = styled.div<StyledGalleryProps>`
    --gap: ${(props) => props.$gap}px;

    display: flex;
    width: ${(props) => props.$width}px;

    gap: var(--gap);

    color: ${({ theme }) => theme.color};
    background-color: ${({ theme }) => theme.backgroundColor};

    > div {
        flex: 0 0 ${(props) => props.$columnWidth}px;
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
    layout: Layout;
    columnWidth: number;
    gap?: number;
    onClick?: (src: string) => void;
    videoPlaying?: boolean;
    className?: string;
};

export const Gallery = forwardRef(
    (
        {
            images,
            layout,
            columnWidth,
            gap = 8,
            onClick,
            videoPlaying,
            className,
        }: GalleryProps,
        parentRef: React.Ref<HTMLDivElement>,
    ) => {
        const adjusted = adjustLayout(layout, columnWidth, gap);
        const width = layout.length * columnWidth + gap * (layout.length - 1);

        console.log("drawn", columnWidth, gap, width, layout);

        return (
            <StyledGallery
                $gap={gap}
                $columnWidth={columnWidth}
                $width={width}
                ref={parentRef}
                className={className}
            >
                {adjusted.map((col, i) => (
                    <div key={`i_${i}`}>
                        {col.images.map((img, j) => (
                            <div key={`j_${j}`}>
                                <Media
                                    src={images[img.id]}
                                    aspectRatio={img.nd.width / img.nd.height}
                                    onClick={onClick}
                                    videoPlaying={videoPlaying}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </StyledGallery>
        );
    },
);

const ResponsiveGalleryWrapper = styled.div<{ $height: number }>`
    width: 100%;
    height: ${({ $height }) => $height}px;
    position: relative;

    > div {
        position: absolute;
        top: 0;
        left: 0;
    }
`;

type ResponsiveGalleryProps = {
    images: Asset[];
    gap?: number;
    onClick?: (src: string) => void;
    className?: string;
};

export const ResponsiveGallery = forwardRef(
    (
        { images, gap = 8, onClick, className }: ResponsiveGalleryProps,
        parentRef,
    ) => {
        const [ref, size] = useSize<HTMLDivElement>();
        const [galRef, galSize] = useSize<HTMLDivElement>();
        const [columns, setColums] = useState(2);
        const columnWidth = (size.width - (columns - 1) * gap) / columns;

        const layouts = [
            createLayout(images, 1),
            createLayout(images, 2),
            createLayout(images, 3),
        ];

        useEffect(() => {
            if (size.width < 700) setColums(2);
            else if (size.width < 1200) setColums(2);
            else setColums(2);
        }, [size]);

        console.log("RG Drawn", layouts);

        return (
            <ResponsiveGalleryWrapper
                $height={galSize.height}
                ref={(node) => {
                    setRef(parentRef, node);
                    setRef(ref, node);
                }}
                className={className}
            >
                <Gallery
                    images={images}
                    layout={layouts[columns - 1]}
                    gap={gap}
                    columnWidth={columnWidth}
                    onClick={onClick}
                    ref={galRef}
                />
            </ResponsiveGalleryWrapper>
        );
    },
);

type HorizontalGalleryProps = {
    images: Asset[];
    targetHeight: number;
    columnWidth: number;
    gap?: number;
    onClick?: (src: string) => void;
    setColumns?: (columns: number) => void;
    videoPlaying?: boolean;
    className?: string;
};

export const HorizontalGallery = forwardRef(
    (
        {
            images,
            targetHeight,
            gap,
            columnWidth,
            onClick,
            setColumns,
            videoPlaying,
            className,
        }: HorizontalGalleryProps,
        parentRef: React.Ref<HTMLDivElement>,
    ) => {
        const layout = createLayoutHorizontal(images, targetHeight);

        useEffect(() => {
            if (!setColumns) return;
            setColumns(layout.length);
        }, [layout.length]);

        return (
            <Gallery
                images={images}
                layout={layout}
                gap={gap}
                columnWidth={columnWidth}
                onClick={onClick}
                ref={parentRef}
                videoPlaying={videoPlaying}
                className={className}
            />
        );
    },
);

type Image = {
    id: number;
    nd: { width: number; height: number };
};

type Column = {
    images: Image[];
    height: number;
};

type Layout = Column[];

function createLayout(images: Asset[], columns: number): Layout {
    // Get image data
    var imageData = getImageData(images);

    // Sort images by normalized height
    imageData.sort((a, b) => a.nd.height - b.nd.height);

    // Create layout
    var layout: Layout = [];
    for (let i = 0; i < columns; i++) layout.push({ images: [], height: 0 });

    // Add images to shortest column until all images are added
    for (let i = 0; i < imageData.length; i++) {
        var img = imageData[i];
        var shortestColumn = layout.reduce((prev, curr) =>
            prev.height < curr.height ? prev : curr,
        );

        shortestColumn.images.push(img);
        shortestColumn.height += img.nd.height;
    }

    // Shuffle images deterministically
    for (let i = 0; i < columns; i++) {
        layout[i].images = shuffle(layout[i].images, 1);
    }

    return layout;
}

function createLayoutHorizontal(images: Asset[], maxHeight: number): Layout {
    var imageData = getImageData(images);
    var layout: Layout = [{ images: [], height: 0 }];

    for (let i = 0; i < imageData.length; i++) {
        var last = layout[layout.length - 1];
        var img = imageData[i];

        if (last.height < maxHeight) {
            last.images.push(img);
            last.height += img.nd.height;
        } else {
            layout.push({ images: [img], height: img.nd.height });
        }
    }

    // If the smallest column is smaller than max height, merge with second smallest column
    layout.sort((a, b) => a.height - b.height);

    if (layout[0].height < maxHeight && layout.length > 1) {
        layout[1].images = layout[1].images.concat(layout[0].images);
        layout[1].height += layout[0].height;
        layout.shift();
    }

    // Shuffle images deterministically
    layout = shuffle(layout, 1);

    for (let i = 0; i < layout.length; i++) {
        layout[i].images = shuffle(layout[i].images, 1);
    }

    return layout;
}

function adjustLayout(layout: Layout, columnWidth: number, gap: number) {
    var adjusted: Layout = [];

    // Adjust image sizes to fit column width
    for (let i = 0; i < layout.length; i++) {
        var col = layout[i];
        var newImgs: Image[] = [];

        for (let j = 0; j < col.images.length; j++) {
            var img = col.images[j];

            newImgs.push({
                id: img.id,
                nd: {
                    width: img.nd.width * columnWidth,
                    height: img.nd.height * columnWidth,
                },
            });
        }

        adjusted.push({
            images: newImgs,
            height: col.height * columnWidth,
        });
    }

    // Adjust column heights by gap according to image count
    for (let i = 0; i < adjusted.length; i++) {
        var col = adjusted[i];
        col.height += gap * (col.images.length - 1);
    }

    // Find average column height
    var averageHeight =
        adjusted.reduce((prev, curr) => prev + curr.height, 0) /
        adjusted.length;

    // Adjust image height to match average column height
    for (let i = 0; i < adjusted.length; i++) {
        var col = adjusted[i];
        var diff = (averageHeight - col.height) / col.images.length;

        for (let j = 0; j < col.images.length; j++) {
            col.images[j].nd.height += diff;
        }
    }

    return adjusted;
}

function getImageData(images: Asset[]): Image[] {
    return images.map((img, idx) => {
        var aspectRatio = img.dimensions.width / img.dimensions.height;

        return {
            id: idx,
            nd: {
                width: 1,
                height: 1 / aspectRatio,
            },
        };
    });
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
