import styled from "styled-components";

const Overlay = styled.div`
    position: absolute;
    z-index: 5;

    height: 100%;
    width: 100%;
    top: 0;
    left: 0;

    /* background: linear-gradient(black -20%, transparent 50%, black 120%); */
    background: black;
`;

export default Overlay;
