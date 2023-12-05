import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import styled from "styled-components";

import { portfolioOptions } from "../../global/richTextOptions";

import { packRichText } from "../../types/RichText";
import Service from "../../types/Service";
import Button from "../Button";
import { Heading1, Heading2, Paragraph } from "../Typography";
import Slideshow from "../media/Slideshow";
import YouTube from "../media/YouTube";

const HeroHeading = styled(Heading1)`
    font-size: 6vw;

    @media (max-width: 1200px) {
        font-size: 4rem;
    }
`;

const HeroDetails = styled.div`
    flex: 1;
`;

const HeroSlideshow = styled.div`
    flex: 1;
`;

const HeroButton = styled(Button)`
    font-size: 2.5rem;

    ${Heading2} {
        padding: 0.1em;
    }
`;

const HeroWrapper = styled.div`
    display: flex;
    gap: 1rem;

    @media (max-width: 850px) {
        flex-direction: column-reverse;
    }
`;

type HeroProps = {
    service: Service;
};

export default function Hero({ service }: HeroProps) {
    return (
        <HeroWrapper>
            <HeroDetails>
                <HeroHeading>{service.pitchTitle}</HeroHeading>

                <Paragraph>
                    {renderRichText(
                        packRichText(service.description),
                        portfolioOptions,
                    )}
                </Paragraph>

                <HeroButton to="#" type="normal" direction="right">
                    {service.callToAction}
                </HeroButton>
            </HeroDetails>

            <HeroSlideshow>
                {!service.youTube && (
                    <Slideshow
                        src={service.slideshow.items}
                        aspectRatio={16 / 9}
                    />
                )}

                {service.youTube && (
                    <YouTube url={service.youTube} aspectRatio={16 / 9} />
                )}
            </HeroSlideshow>
        </HeroWrapper>
    );
}
