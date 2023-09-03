import { Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import styled from "styled-components";

import { portfolioOptions } from "../global/richTextOptions";

import { RichText } from "../types";
import { Paragraph } from "./Typography";

const StyledDetails = styled.div`
    ${Paragraph} {
        margin: 0.5rem;
        font-size: 1.5rem;
        line-height: 1.1em;

        span {
            display: inline-block;
        }
    }

    .title {
        font-family: var(--heading-font);
    }

    clear: both;
`;

type DetailsProps = {
    date: string;
    tags: string[] | ReadonlyArray<string | null>;
    description?: RichText;
    plainText?: string;
};

const Details = ({ date, tags, description, plainText }: DetailsProps) => (
    <StyledDetails>
        <Paragraph>
            <span className="title">/date&nbsp;</span>
            <span>{date}</span>
        </Paragraph>

        <Paragraph>
            <span className="title">/tags&nbsp;</span>
            {tags.map((tag, idx) => (
                <span key={idx}>
                    <Link to="#">{tag}</Link>
                    {idx !== tags.length - 1 ? <>,&nbsp;</> : ""}
                </span>
            ))}
        </Paragraph>

        <Paragraph>
            <span className="title">/description&nbsp;</span>
            {plainText ? plainText : ""}
            {description ? renderRichText(description, portfolioOptions) : ""}
        </Paragraph>
    </StyledDetails>
);

export default Details;
