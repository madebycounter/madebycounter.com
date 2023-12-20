import React from "react";
import styled from "styled-components";

// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
function getVideoId(url: string) {
    var regExp =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&?]*).*/;
    var match = url.match(regExp);

    if (match && match.length >= 2) return match[2];
    else return null;
}

type YouTubeProps = {
    url: string;
    aspectRatio?: number;
};

type StyledEmbedProps = {
    $aspectRatio: number;
};

const StyledEmbed = styled.div<StyledEmbedProps>`
    aspect-ratio: ${(props) => props.$aspectRatio};
    width: 100%;
    overflow: hidden;

    iframe {
        border: none;
        width: 100%;
        height: 100%;
    }
`;

const YouTube = ({ url, aspectRatio = 16 / 9 }: YouTubeProps) => {
    const embedId = getVideoId(url);

    return (
        <StyledEmbed $aspectRatio={aspectRatio}>
            <iframe
                src={`https://www.youtube.com/embed/${embedId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Embed"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </StyledEmbed>
    );
};

YouTube.defaultProps = {
    aspectRatio: 16 / 9,
};

export default YouTube;
