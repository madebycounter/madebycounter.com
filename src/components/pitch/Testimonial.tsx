import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import styled from "styled-components";

import { portfolioOptions } from "../../global/richTextOptions";

import Testimonial from "../../types/components/Testimonial";

import { packRichText } from "../../types/RichText";
import { Paragraph } from "../Typography";
import Slash from "../cards/utils/Slash";
import Media from "../media/Media";

const Star = styled.div`
    aspect-ratio: 1;
    background-color: ${({ theme }) => theme.backgroundColor};

    clip-path: polygon(
        50% 0%,
        61% 35%,
        98% 35%,
        68% 57%,
        79% 91%,
        50% 70%,
        21% 91%,
        32% 57%,
        2% 35%,
        39% 35%
    );
`;

const StarBoxWrapper = styled.div`
    margin: 1rem 0 0.5rem 0;
    display: flex;
    height: 30px;
    gap: 0.1rem;
`;

type StarBoxProps = {
    rating: number;
};

function StarBox({ rating }: StarBoxProps) {
    return (
        <StarBoxWrapper>
            {[...Array(rating)].map((_, idx) => (
                <Star key={idx} />
            ))}
        </StarBoxWrapper>
    );
}

const TestimonialWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 200px;
    gap: 0.5rem;

    @media (max-width: 670px) {
        grid-template-columns: 1fr;
    }
`;

const ReviewSlash = styled(Slash)`
    position: absolute;
    height: 100%;
    left: calc(100%);
    top: 0;

    background-color: ${({ theme }) => theme.color};

    @media (max-width: 670px) {
        display: none;
    }
`;

const ReviewBox = styled.div`
    position: relative;
    background-color: ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.backgroundColor};

    padding: 0 1rem;
`;

const ReviewContent = styled(Paragraph)`
    margin: 0.5rem 0;

    font-size: 1.5em;
    line-height: 1.2em;

    @media (max-width: 670px) {
        font-size: 1.2rem;
    }
`;

const ReviewerBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    text-align: right;
    line-height: 1em;

    @media (max-width: 670px) {
        display: none;
    }
`;

const ReviewerDetails = styled(Paragraph)`
    margin: 0.5rem;
    margin-bottom: 0;
    line-height: 1em;
    font-size: 1rem;
`;

const ReviewerName = styled.span`
    font-family: var(--heading-font);
    line-height: 1em;
`;

const ReviewerTitle = styled.span`
    line-height: 1em;
`;

const ReviewerMobile = styled.div`
    display: none;
    margin: 0.5rem 0;

    ${ReviewerDetails} {
        margin: 0;
    }

    @media (max-width: 670px) {
        display: flex;
        justify-content: flex-end;
    }
`;

const MediaBox = styled.div`
    display: flex;
    justify-content: flex-end;

    > div {
        width: 70%;
    }
`;

type TestimonialCardProps = {
    testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
    return (
        <TestimonialWrapper>
            <ReviewBox>
                <StarBox rating={testimonial.rating} />

                <ReviewContent>
                    "
                    {renderRichText(
                        packRichText(testimonial.content),
                        portfolioOptions,
                    )}
                    "
                </ReviewContent>

                <ReviewerMobile>
                    <ReviewerDetails>
                        <ReviewerName>{testimonial.name}</ReviewerName>

                        <ReviewerTitle>
                            ,{" "}
                            {
                                testimonial.jobTitle[
                                    testimonial.jobTitle.length - 1
                                ]
                            }
                        </ReviewerTitle>

                        {/* {testimonial.jobTitle.map((title, idx) => (
                            <ReviewerTitle key={idx}>, {title}</ReviewerTitle>
                        ))} */}
                    </ReviewerDetails>
                </ReviewerMobile>

                <ReviewSlash />
            </ReviewBox>

            <ReviewerBox>
                <MediaBox>
                    <Media
                        src={testimonial.headshot}
                        aspectRatio={1}
                        resizeMode="contain"
                    />
                </MediaBox>
                <ReviewerDetails>
                    <ReviewerName>
                        {testimonial.name}
                        <br />
                    </ReviewerName>

                    {testimonial.jobTitle.map((title, idx) => (
                        <ReviewerTitle key={idx}>
                            {title}
                            <br />
                        </ReviewerTitle>
                    ))}
                </ReviewerDetails>
            </ReviewerBox>
        </TestimonialWrapper>
    );
}
