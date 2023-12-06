import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import styled from "styled-components";

import { portfolioOptions } from "../../global/richTextOptions";

import TeamMember from "../../types/components/TeamMember";

import { packRichText } from "../../types/RichText";
import Service from "../../types/Service";
import Button from "../Button";
import { Heading1, Heading2, Paragraph } from "../Typography";
import Media from "../media/Media";
import Slideshow from "../media/Slideshow";
import YouTube from "../media/YouTube";

const TeamMemberWrapper = styled.div`
    position: absolute;
    width: 230px;
    z-index: 10;

    top: -10%;
    left: 41%;
`;

function TeamMemberPhoto({ teamMember }: { teamMember: TeamMember }) {
    return (
        <TeamMemberWrapper>
            <Media src={teamMember.fullBody} />
        </TeamMemberWrapper>
    );
}

const HeroHeading = styled(Heading1)`
    font-size: 6vw;

    @media (max-width: 1200px) {
        font-size: 4rem;
    }
`;

const HeroDetails = styled.div`
    grid-area: details;

    ${Paragraph} {
        max-width: 80%;
    }
`;

const HeroSlideshow = styled.div`
    grid-area: slideshow;

    flex: 1;
`;

const HeroButton = styled(Button)`
    font-size: 2.5rem;

    ${Heading2} {
        padding: 0.1em;
    }
`;

const CallToAction = styled.div`
    grid-area: cta;

    display: flex;
    align-items: flex-start;
    height: 48px;

    > :last-child {
    }
`;

const HeroWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas: "details slideshow" "cta slideshow";
    grid-column-gap: 5rem;

    max-width: 1700px;
    margin: auto;
    padding: 0 1rem;
`;

type HeroProps = {
    service: Service;
    teamMember: TeamMember;
};

export default function Hero({ service, teamMember }: HeroProps) {
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
            </HeroDetails>

            <CallToAction>
                <HeroButton to="#" type="normal" direction="right">
                    {service.callToAction}
                </HeroButton>

                <Media
                    src={teamMember.signature}
                    aspectRatio="original"
                    resizeMode="contain"
                />
            </CallToAction>

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
