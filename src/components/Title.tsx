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
    $fontSize: string;
    $dip: boolean;
};

const StyledTitle = styled.h1<StyledTitleProps>`
    font-size: ${(props) => props.$fontSize};
    letter-spacing: calc(${(props) => props.$fontSize} / -25);
    margin: 1rem 0;
    ${(props) => !props.$dip && "margin-bottom: 0"};
`;

type TitleProps = {
    content: string;
    fontSize?: string;
};

export default function Title({
    content,
    fontSize = "min(8rem, 14vw)",
}: TitleProps) {
    return (
        <StyledTitle
            $fontSize={fontSize}
            $dip={letter_in_array(content, DIP_LETTERS)}
        >
            {content}
        </StyledTitle>
    );
}
