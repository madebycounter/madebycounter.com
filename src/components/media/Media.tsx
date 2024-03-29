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
    return ["image/jpeg", "image/png", "image/webp"].includes(mimeType);
}

export function isGif(mimeType: string): boolean {
    return mimeType === "image/gif";
}

export type AspectRatio = number | "original";

export type ResizeMode = "width" | "height" | "cover" | "contain";

type MediaWrapperProps = ThemedProps & {
    $aspectRatio: number;
    $resizeMode: ResizeMode;
    $hasClickEvent: boolean;
    $center: number;
    $height?: number;
    $width?: number;
};

const MediaWrapper = styled.div<MediaWrapperProps>`
    overflow: hidden;

    ${(props) =>
        props.$hasClickEvent &&
        css`
            cursor: pointer;
        `}

    ${(props) => {
        if (props.$height) {
            return css`
                height: ${props.$height}px;
                width: ${props.$height * props.$aspectRatio}px;
            `;
        }
        if (props.$width) {
            return css`
                width: ${props.$width}px;
                height: ${props.$width / props.$aspectRatio}px;
            `;
        } else {
            switch (props.$resizeMode) {
                case "width":
                    return css`
                        width: 100%;

                        aspect-ratio: ${props.$aspectRatio};

                        max-width: inherit;
                        max-height: inherit;
                    `;
                case "height":
                    return css`
                        height: 100%;

                        aspect-ratio: ${props.$aspectRatio};

                        max-width: inherit;
                        max-height: inherit;
                    `;
                case "cover":
                    return css`
                        width: 100%;
                        height: 100%;

                        max-width: inherit;
                        max-height: inherit;
                    `;
                case "contain":
                    return css`
                        aspect-ratio: ${props.$aspectRatio};

                        max-width: 100%;
                        max-height: 100%;
                    `;
            }
        }
    }}

    .media-wrapper {
        width: 100%;
        height: 100%;

        max-width: inherit;
        max-height: inherit;

        img,
        video {
            width: 100%;
            height: 100%;

            max-width: inherit;
            max-height: inherit;

            object-fit: cover;
            object-position: 50% ${(props) => props.$center}%;
        }
    }
`;

export type MediaProps = {
    src: Asset;
    aspectRatio?: AspectRatio;
    resizeMode?: ResizeMode;
    center?: number;
    videoPlaying?: boolean;
    videoLoop?: boolean;
    onVideoEnd?: () => void;
    onClick?: (id: string) => void;
    onReady?: () => void;
    className?: string;
    height?: number;
    width?: number;
};

export default function Media({
    src,
    aspectRatio = "original",
    resizeMode = "width",
    center = 50,
    videoPlaying = true,
    videoLoop = true,
    onVideoEnd = () => {},
    onClick,
    onReady = () => {},
    className,
    height,
    width,
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

    return (
        <MediaWrapper
            $aspectRatio={
                aspectRatio === "original"
                    ? dimensions.width / dimensions.height
                    : aspectRatio
            }
            $resizeMode={resizeMode}
            $hasClickEvent={!!onClick}
            $center={center}
            $height={height}
            $width={width}
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
        </MediaWrapper>
    );
}
