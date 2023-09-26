import { Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import styled from "styled-components";

import { portfolioOptions } from "../global/richTextOptions";

import { RichText } from "../types";
import { Paragraph } from "./Typography";

export const StyledDetails = styled.div`
    font-size: 1.2rem;
`;

const DetailsParagraph = styled(Paragraph)`
    font-size: inherit !important;
    margin: 0.3em 0.5rem;
    line-height: 1.3em;

    span {
        display: inline-block;
    }
`;

const DetailsTitle = styled.span`
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: 400;
`;

export const DetailsDate = styled(DetailsParagraph)``;
export const DetailsTags = styled(DetailsParagraph)``;
export const DetailsDescription = styled(DetailsParagraph)``;

type DetailsProps = {
    date?: string;
    tags?: string[] | ReadonlyArray<string | null>;
    description?: RichText;
    plainText?: string;
};

const Details = ({ date, tags, description, plainText }: DetailsProps) => (
    <StyledDetails>
        {date && (
            <DetailsDate>
                <DetailsTitle>/date&nbsp;</DetailsTitle>
                <span>{date}</span>
            </DetailsDate>
        )}

        {tags && tags.length > 0 && (
            <DetailsTags>
                <DetailsTitle>/tags&nbsp;</DetailsTitle>
                {tags.map((tag, idx) => (
                    <span key={idx}>
                        <Link to="#">{tag}</Link>
                        {idx !== tags.length - 1 ? <>,&nbsp;</> : ""}
                    </span>
                ))}
            </DetailsTags>
        )}

        {(description || plainText) && (
            <DetailsDescription>
                <DetailsTitle>/description&nbsp;</DetailsTitle>
                {plainText ? plainText : ""}
                {description
                    ? renderRichText(description, portfolioOptions)
                    : ""}
            </DetailsDescription>
        )}
    </StyledDetails>
);

export default Details;
