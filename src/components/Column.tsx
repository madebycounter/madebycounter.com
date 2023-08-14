import React from "react";
import styled from "styled-components";

const StyledColumn = styled.div`
    color: ${({ theme }) => theme.color};
    background-color: ${({ theme }) => theme.backgroundColor};

    > div {
        max-width: 800px;
        margin: auto;
    }
`;

type ColumnProps = {
    children: React.ReactNode;
};

export default function Column({ children }: ColumnProps) {
    return (
        <StyledColumn>
            <div>{children}</div>
        </StyledColumn>
    );
}
