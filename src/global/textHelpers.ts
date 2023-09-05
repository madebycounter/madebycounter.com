import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

import { RichText } from "../types";

// https://stackoverflow.com/questions/5454235/shorten-string-without-cutting-words-in-javascript
export function shorten(str: string, maxLen: number, separator: string = " ") {
    if (str.length <= maxLen) return str;
    return str.substring(0, str.lastIndexOf(separator, maxLen));
}

export function smartShorten(content: RichText, length: number = 180) {
    const text = documentToPlainTextString(JSON.parse(content.raw));
    var shortened = shorten(text, length);

    if (
        shortened.endsWith(".") ||
        shortened.endsWith("!") ||
        shortened.endsWith("?")
    ) {
        return shortened;
    } else if (
        shortened.endsWith(",") ||
        shortened.endsWith(";") ||
        shortened.endsWith(":") ||
        shortened.endsWith(")") ||
        shortened.endsWith("]")
    ) {
        return shortened.substring(0, shortened.length - 1) + "...";
    } else {
        return shortened + "...";
    }
}

export function renderPlainText(content: RichText) {
    return documentToPlainTextString(JSON.parse(content.raw));
}
