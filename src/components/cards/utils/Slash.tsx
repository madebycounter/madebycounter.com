import styled from "styled-components";

const Slash = styled.div`
    aspect-ratio: 400 / 1650;

    background-color: ${(props) => props.theme.backgroundColor};
    z-index: 10;

    clip-path: polygon(0% 0%, 0% 100%, 50% 50%, 100% 0%);
`;

export default Slash;
