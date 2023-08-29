import { BLOCKS, Block, Inline } from "@contentful/rich-text-types";
import { Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React, { ReactNode } from "react";
import styled from "styled-components";

import { portfolioOptions } from "../../global/richTextOptions";

import { RichText } from "../../types";

const StyledDetails = styled.div`
    p {
        margin: 0.5rem;
        line-height: 1.6rem;
        font-size: 1.5rem;
        max-width: 100%;
        font-weight: 300;

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
    description: RichText;
};

const Details = ({ date, tags, description }: DetailsProps) => (
    <StyledDetails>
        <p>
            <span className="title">/date&nbsp;</span>
            <span>{date}</span>
        </p>

        <p>
            <span className="title">/tags&nbsp;</span>
            {tags.map((tag, idx) => (
                <span key={idx}>
                    <Link to="#">{tag}</Link>
                    {idx !== tags.length - 1 ? <>,&nbsp;</> : ""}
                </span>
            ))}
        </p>

        <p>
            <span className="title">/description&nbsp;</span>
            {renderRichText(description, portfolioOptions)}
        </p>
    </StyledDetails>
);

export default Details;
