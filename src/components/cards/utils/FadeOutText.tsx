import styled from "styled-components";

const FadeOutText = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    z-index: 10;
    background: linear-gradient(transparent, white);
`;

export default FadeOutText;
