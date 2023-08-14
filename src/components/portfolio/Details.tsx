import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

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
    description: string;
};

const Details = ({ date, tags, description }: DetailsProps) => {
    return (
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
                {description}
            </p>
        </StyledDetails>
    );
};

export default Details;
