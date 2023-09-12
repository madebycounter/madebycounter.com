import classnames from "classnames";
import { graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import { ThemedProps } from "../../global/themes";

import Asset from "../../types/Asset";

export function isVideo(mimeType: string): boolean {
    return ["video/mp4", "video/webm"].includes(mimeType);
}

export function isImage(mimeType: string): boolean {
    return ["image/jpeg", "image/png"].includes(mimeType);
}

export function isGif(mimeType: string): boolean {
    return mimeType === "image/gif";
}

export enum ResizeMode {
    Width,
    Height,
    Fill,
    Contain,
}

type StyledMediaProps = ThemedProps & {
    $aspectRatio: number;
    $center: number;
    $resizeMode: ResizeMode;
    $hasClickEvent: boolean;
};

const StyledMedia = styled.div<StyledMediaProps>`
    aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
    overflow: hidden;

    ${({ $hasClickEvent }) =>
        $hasClickEvent &&
        css`
            cursor: pointer;
        `}

    ${({ $resizeMode }) => {
        switch ($resizeMode) {
            case ResizeMode.Width:
                return css`
                    width: 100%;
                `;
            case ResizeMode.Height:
                return css`
                    height: 100%;
                `;
            case ResizeMode.Fill:
                return css`
                    width: 100%;
                    height: 100%;
                `;
            case ResizeMode.Contain:
                return css`
                    max-width: 100%;
                    max-height: 100%;
                    margin: auto;
                `;
        }
    }}

    > div {
        width: 100%;
        height: 100%;

        > img,
        > video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 50% ${({ $center }) => $center}%;
        }
    }

    .gatsby-image-wrapper {
        [data-main-image] {
            object-position: 50% ${({ $center }) => $center}%;
        }
    }
`;

export type MediaProps = {
    src: Asset;
    aspectRatio?: number | null;
    center?: number;
    resizeMode?: ResizeMode;
    className?: string;
    videoPlaying?: boolean;
    videoLoop?: boolean;
    onVideoEnd?: () => void;
    onClick?: (id: string) => void;
    onReady?: () => void;
};

export default function Media({
    src,
    aspectRatio,
    className,
    center = 50,
    resizeMode = ResizeMode.Contain,
    videoPlaying = true,
    videoLoop = true,
    onVideoEnd = () => {},
    onClick,
    onReady = () => {},
}: MediaProps) {
    if (!src) {
        return <span>No source</span>;
    }

    const { mimeType, publicUrl, description, gatsbyImageData, dimensions } =
        src;

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!isVideo(mimeType) || !videoRef.current) return;

        // TODO: proper error handling
        if (videoPlaying) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(console.log);
        } else {
            videoRef.current.pause();
        }
    }, [videoPlaying]);

    if (aspectRatio === null || aspectRatio === undefined) {
        aspectRatio = dimensions.width / dimensions.height;
    }

    return (
        <StyledMedia
            $aspectRatio={aspectRatio}
            $center={center}
            $resizeMode={resizeMode}
            $hasClickEvent={!!onClick}
            onClick={() => onClick && onClick(src.contentful_id)}
            className={className}
        >
            {isImage(mimeType) && (
                <GatsbyImage
                    image={gatsbyImageData as IGatsbyImageData}
                    alt={description ? description : ""}
                    onLoad={onReady}
                    className="media-wrapper image-wrapper"
                />
            )}

            {isGif(mimeType) && (
                <div className="media-wrapper gif-wrapper">
                    <img
                        src={publicUrl}
                        alt={description ? description : ""}
                        onLoad={onReady}
                    />
                </div>
            )}

            {isVideo(mimeType) && (
                <div className="media-wrapper video-wrapper">
                    <video
                        ref={videoRef}
                        disableRemotePlayback
                        playsInline
                        muted
                        loop={videoLoop}
                        autoPlay={videoPlaying}
                        onEnded={onVideoEnd}
                        onCanPlay={onReady}
                    >
                        <source src={publicUrl} type={mimeType} />
                    </video>
                </div>
            )}
        </StyledMedia>
    );
}

export const query = graphql`
    fragment Media on ContentfulAsset {
        __typename
        contentful_id
        title
        description
        mimeType
        publicUrl
        gatsbyImageData(breakpoints: [750, 1080, 1366, 1920])
        dimensions {
            width
            height
        }
    }
`;
