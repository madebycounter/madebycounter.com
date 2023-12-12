import React from "react";
import styled from "styled-components";

const DIP_LETTERS = ["g", "j", "p", "q", "y"];

function letter_in_array(word: string, letter_array: string[]) {
    for (const letter of word) {
        if (letter_array.includes(letter.toLowerCase())) {
            return true;
        }
    }
    return false;
}

type StyledTitleProps = {
    $dip: boolean;
};

const StyledTitle = styled.h1<StyledTitleProps>`
    font-size: min(8rem, 14vw);
    line-height: 1em;
    letter-spacing: -0.04em;
    margin: 1rem 0;
    ${(props) => !props.$dip && "margin-bottom: 0"};
`;

type TitleProps = {
    content: string;
    className?: string;
};

export default function Title({ content, className }: TitleProps) {
    return (
        <StyledTitle
            $dip={letter_in_array(content, DIP_LETTERS)}
            className={className}
        >
            {content}
        </StyledTitle>
    );
}
