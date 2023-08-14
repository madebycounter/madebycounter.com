import { Link } from "gatsby";
import React, { forwardRef } from "react";
import styled from "styled-components";

import Banner from "../images/banner.svg";

const StyledNavbar = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 0 3rem;
    padding: 2rem;

    background-color: ${({ theme }) => theme.backgroundColor};

    .logo {
        aspect-ratio: 14820 / 3084;
        height: min(4rem, 6vw);

        img {
            width: 100%;
            filter: ${({ theme }) => theme.imageFilter};
        }
    }

    .links {
        gap: 0rem 0.8rem;

        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        a {
            font-size: min(2.5rem, 4vw);
            font-family: var(--body-font);
            line-height: normal;
            text-decoration: none;
            position: relative;

            color: ${({ theme }) => theme.color};

            &:before {
                content: "";
                position: absolute;
                width: 100%;
                height: 2px;
                bottom: -2px;
                left: 0px;
                transition: transform 100ms ease;

                background-color: ${({ theme }) => theme.color};
            }

            &:not(.active)::before {
                transform: scaleX(0);
            }

            &:hover::before,
            &:focus::before {
                border: none;
                transform: scaleX(1);
            }
        }
    }

    @media (max-width: 700px) {
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        padding-top: 3rem;

        .links {
            justify-content: center;
            gap: 1vw;

            a {
                font-size: 6.5vw;
            }
        }

        .logo,
        .links {
            width: 80vw;
            height: auto;
        }
    }
`;

type NavbarItem = "about" | "services" | "portfolio" | "blog";

type NavbarProps = {
    active: NavbarItem;
};

export default forwardRef(function (
    { active }: NavbarProps,
    ref: React.Ref<HTMLDivElement>,
) {
    const isActive = (name: NavbarItem) => {
        return active === name ? "active" : "";
    };

    return (
        <StyledNavbar className="navbar" ref={ref}>
            <div className="logo">
                <Link to="/">
                    <img src={Banner} alt="" />
                </Link>
            </div>

            <div className="links">
                <Link className={isActive("about")} to="/">
                    about
                </Link>
                <Link className={isActive("services")} to="/services">
                    services
                </Link>
                <Link className={isActive("portfolio")} to="/portfolio">
                    portfolio
                </Link>
                <Link className={isActive("blog")} to="/blog">
                    blog
                </Link>
            </div>
        </StyledNavbar>
    );
});
