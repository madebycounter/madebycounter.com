// https://angel-rs.github.io/css-color-filter-generator/
export interface Theme {
    color: string;
    backgroundColor: string;
    imageFilter: string;
    fonts: {
        body: string;
        heading: string;
        mono: string;
    };
}

const BODY_FONT = "Roboto, Arial, Helvetica Neue, Helvetica, sans-serif";
const HEADING_FONT =
    "Counter Arial, Arial, Helvetica Neue, Helvetica, sans-serif";
const MONO_FONT =
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace";

export const DarkTheme: Theme = {
    color: "white",
    backgroundColor: "#000003",
    imageFilter: "invert(100%)",
    fonts: {
        body: BODY_FONT,
        heading: HEADING_FONT,
        mono: MONO_FONT,
    },
};

export const LightTheme: Theme = {
    color: "#000003",
    backgroundColor: "white",
    imageFilter: "none",
    fonts: {
        body: BODY_FONT,
        heading: HEADING_FONT,
        mono: MONO_FONT,
    },
};

export const TestTheme: Theme = {
    color: "#dbac00",
    backgroundColor: "#5e0002",
    imageFilter:
        "brightness(0) saturate(100%) invert(71%) sepia(97%) saturate(2776%) hue-rotate(12deg) brightness(99%) contrast(104%)",
    fonts: {
        body: BODY_FONT,
        heading: HEADING_FONT,
        mono: MONO_FONT,
    },
};

export type ThemedProps = {
    theme: Theme;
};

export function oppositeTheme(theme: Theme): Theme {
    return theme === DarkTheme ? LightTheme : DarkTheme;
}
