import { graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import { ThemedProps } from "../../global/themes";
import { MediaData } from "../../global/types";

function isVideo(mimeType: string) {
    return ["video/mp4", "video/webm"].includes(mimeType);
}

function isImage(mimeType: string) {
    return ["image/jpeg", "image/png"].includes(mimeType);
}

function isGif(mimeType: string) {
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
};

const StyledMedia = styled.div<StyledMediaProps>`
    aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
    overflow: hidden;

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
    src: MediaData;
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
    videoPlaying = false,
    videoLoop = true,
    onVideoEnd = () => {},
    onClick = (id: string) => {},
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

        if (videoPlaying) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
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
            onClick={() => onClick && onClick(src.contentful_id)}
            className={className}
        >
            {isImage(mimeType) && (
                <GatsbyImage
                    image={gatsbyImageData as IGatsbyImageData}
                    alt={description ? description : ""}
                    onLoad={onReady}
                />
            )}

            {isGif(mimeType) && (
                <div className="gif-wrapper">
                    <img
                        src={publicUrl}
                        alt={description ? description : ""}
                        onLoad={onReady}
                    />
                </div>
            )}

            {isVideo(mimeType) && (
                <div className="video-wrapper">
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
