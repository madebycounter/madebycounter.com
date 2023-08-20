import { createGlobalStyle } from "styled-components";

import CountArial from "./countarial.woff2";

const GlobalStyle = createGlobalStyle`
    // variables
    :root {
        --body-font: "Roboto", "Arial", "Helvetica Neue", "Helvetica", sans-serif;
        --heading-font: "Counter Arial", "Arial", "Helvetica Neue", "Helvetica",
            sans-serif;
        --mono-font: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        --c100: calc(100vw - 2rem);

    }

    // default styles
    @font-face {
        font-family: "Counter Arial";
        src: local("Counter Arial"), url(${CountArial});
        font-weight: 400;
        font-style: normal;
    }

    * {
        margin: 0;
        padding: 0;
    }

    html {
        scroll-behavior: smooth;
    }

    a {
        color: inherit;
    }

    body {
        font-family: var(--body-font);
        position: relative;
        line-height: 1.5;
        min-height: 100vh;

        color: ${({ theme }) => theme.color};
        background-color: ${({ theme }) => theme.backgroundColor};
    }

    video::-internal-media-controls-overlay-cast-button {
        display: none;
    }

    h1, h2, h3 {
        font-family: var(--heading-font);
        font-weight: 400;
    }
`;

export default GlobalStyle;
