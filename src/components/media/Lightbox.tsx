import React from "react";
import styled from "styled-components";
import YALB from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";

import Asset from "../../types/Asset";
import Media from "./Media";

declare module "yet-another-react-lightbox" {
    export interface MediaSlide {
        type: "media-slide";
        data: Asset;
    }

    interface SlideTypes {
        "media-slide": MediaSlide;
    }
}

type LightboxProps = {
    media: Asset[];
    open: boolean;
    close: () => void;
    current?: string;
};

const Lightbox = ({ media, open, close, current }: LightboxProps) => {
    var index = 0;

    if (current) {
        index = media.findIndex((item) => item?.contentful_id === current);
    }

    return (
        <YALB
            open={open}
            close={close}
            plugins={[Counter]}
            index={index}
            slides={media.map((item) => ({
                type: "media-slide",
                data: item,
            }))}
            render={{
                slide: ({ slide }) =>
                    slide.type === "media-slide" ? (
                        <Media src={slide.data} resizeMode="contain" />
                    ) : undefined,
            }}
        />
    );
};

export default Lightbox;
