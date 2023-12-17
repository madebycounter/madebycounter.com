import { Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import styled from "styled-components";

import { portfolioOptions } from "../global/richTextOptions";

import { RichTextResponse, packRichText } from "../types/RichText";
import { Paragraph } from "./Typography";

export const StyledDetails = styled.div`
    font-size: 1.2rem;
    margin: 0.5rem;
`;

const DetailsParagraph = styled(Paragraph)`
    font-size: inherit !important;
    margin: 0.3em 0;
    line-height: 1.2em;

    span {
        display: inline-block;
    }
`;

const DetailsTitle = styled.span`
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: 400;
`;

type DetailsProps = {
    date?: string;
    tags?: string[] | ReadonlyArray<string | null>;
    description?: RichTextResponse;
    plainText?: string;
    className?: string;
    showDescription?: boolean;
};

const Details = ({
    date,
    tags,
    description,
    plainText,
    className,
    showDescription = true,
}: DetailsProps) => {
    return (
        <StyledDetails className={className}>
            {date && (
                <DetailsParagraph>
                    <DetailsTitle>/date&nbsp;</DetailsTitle>
                    <span>{date}</span>
                </DetailsParagraph>
            )}

            {tags && tags.length > 0 && (
                <DetailsParagraph>
                    <DetailsTitle>/tags&nbsp;</DetailsTitle>
                    {tags.map((tag, idx) => (
                        <span key={idx}>
                            <Link to="#">{tag}</Link>
                            {idx !== tags.length - 1 ? <>,&nbsp;</> : ""}
                        </span>
                    ))}
                </DetailsParagraph>
            )}

            {(description || plainText) && showDescription && (
                <DetailsParagraph>
                    <DetailsTitle>/description&nbsp;</DetailsTitle>
                    {plainText ? plainText : ""}
                    {description
                        ? renderRichText(
                              packRichText(description),
                              portfolioOptions,
                          )
                        : ""}
                </DetailsParagraph>
            )}
        </StyledDetails>
    );
};

export default Details;
