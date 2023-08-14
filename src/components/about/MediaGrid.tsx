import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

import { Direction, MediaData } from "../../global/types";

import Carousel from "../Carousel";
import Media from "../media/Media";

type HasGap = {
    gap: number;
};

const MediaGridLayout = styled.div<HasGap>`
    position: absolute;
    left: 0;
    bottom: 0;

    display: grid;
    grid-template-rows: 1fr 200px;
    grid-template-columns: repeat(5, 260px);
    gap: ${(props) => props.gap}px;

    @media (max-width: 700px) {
        grid-template-rows: 1fr 100px;
        grid-template-columns: repeat(5, 150px);
    }
`;

const MediaColumn = styled.div<HasGap>`
    overflow: hidden;
    position: relative;
    height: 1000px;
    width: 100%;
`;

const MediaRow = styled.div<HasGap>`
    grid-column-start: span 5;
    grid-row: 2;
`;

function cyrb128(str: string): [number, number, number, number] {
    let h1 = 1779033703,
        h2 = 3144134277,
        h3 = 1013904242,
        h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [
        (h1 ^ h2 ^ h3 ^ h4) >>> 0,
        (h2 ^ h1) >>> 0,
        (h3 ^ h1) >>> 0,
        (h4 ^ h1) >>> 0,
    ];
}

function sfc32(a: number, b: number, c: number, d: number): () => number {
    return function () {
        a >>>= 0;
        b >>>= 0;
        c >>>= 0;
        d >>>= 0;
        var t = (a + b) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        d = (d + 1) | 0;
        t = (t + d) | 0;
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
    };
}

function shuffle(array: any[]) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

type MediaGridProps = {
    scale?: number;
};

const MediaGrid: React.FC<MediaGridProps> = ({ scale = 1 }) => {
    const { allContentfulAsset } = useStaticQuery(graphql`
        {
            allContentfulAsset(filter: { mimeType: {} }) {
                nodes {
                    ...Media
                }
            }
        }
    `);

    var col1: MediaData[] = [];
    var col2: MediaData[] = [];
    var col3: MediaData[] = [];
    var col4: MediaData[] = [];
    var col5: MediaData[] = [];
    var row: MediaData[] = [];

    var d = 53;
    for (let i = 0 + d; i < 30 + d; i += 6)
        col1.push(allContentfulAsset.nodes[i]);
    for (let i = 1 + d; i < 30 + d; i += 6)
        col2.push(allContentfulAsset.nodes[i]);
    for (let i = 2 + d; i < 30 + d; i += 6)
        col3.push(allContentfulAsset.nodes[i]);
    for (let i = 3 + d; i < 30 + d; i += 6)
        col4.push(allContentfulAsset.nodes[i]);
    for (let i = 4 + d; i < 30 + d; i += 6)
        col5.push(allContentfulAsset.nodes[i]);
    for (let i = 5 + d; i < 30 + d; i += 6)
        row.push(allContentfulAsset.nodes[i]);

    var seed = cyrb128(`${d}`);
    var rand = sfc32(seed[0], seed[1], seed[2], seed[3]);

    function aspect() {
        var n = rand();

        if (n < 0.3) return 16 / 9;
        if (n < 0.8) return 4 / 3;
        return 3 / 4;
    }

    var gap = 10;

    return (
        <MediaGridLayout gap={gap}>
            <MediaColumn gap={gap}>
                <Carousel images={col1} direction={Direction.Down} />
            </MediaColumn>
            <MediaColumn gap={gap}>
                <Carousel images={col2} direction={Direction.Up} />
            </MediaColumn>
            <MediaColumn gap={gap}>
                <Carousel images={col3} direction={Direction.Down} />
            </MediaColumn>
            <MediaColumn gap={gap}>
                <Carousel images={col4} direction={Direction.Up} />
            </MediaColumn>
            <MediaColumn gap={gap}>
                <Carousel images={col5} direction={Direction.Down} />
            </MediaColumn>
            <MediaRow gap={gap}>
                <Carousel images={row} direction={Direction.Left} />
            </MediaRow>
        </MediaGridLayout>
    );
};

export default MediaGrid;
