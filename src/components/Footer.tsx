import { useStaticQuery, graphql } from "gatsby";
import React from "react";
import { Envelope, Instagram, Linkedin, Youtube } from "react-bootstrap-icons";
import styled from "styled-components";

import Column from "./Column";

const StyledFooter = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;

    margin: 0 1rem;

    --footer: 6.5rem;

    > div > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem 2rem;
        height: var(--footer);
    }
    .socials a {
        text-decoration: none;
        color: ${({ theme }) => theme.color};
    }
    p {
        font-size: var(--fs-sm);
        line-height: 1.4;
        margin: 0;
    }
`;

const StyledFooterSpacer = styled.div`
    --footer: 6.5rem;

    height: calc(var(--footer) + 4rem);
`;

export default function Footer() {
    const data = useStaticQuery(graphql`
        {
            site {
                buildTime(formatString: "MMMM D, YYYY")
            }
        }
    `);

    return (
        <>
            <StyledFooterSpacer />
            <StyledFooter>
                <Column>
                    <div className="info">
                        <p>Made by Counter LLC</p>
                        <p>Last updated {data.site.buildTime}</p>
                    </div>

                    <div className="socials">
                        <a
                            href="https://www.linkedin.com/company/madebycounter"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Linkedin size={32} />
                        </a>
                        &nbsp;&nbsp;
                        <a
                            href="https://instagram.com/madebycounter/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Instagram size={32} />
                        </a>
                        &nbsp;&nbsp;
                        <a
                            href="https://youtube.com/@madebycounter"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Youtube size={32} />
                        </a>
                        &nbsp;&nbsp;
                        <a
                            href="mailto:contact@madebycounter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Envelope size={32} />
                        </a>
                    </div>
                </Column>
            </StyledFooter>
        </>
    );
}
