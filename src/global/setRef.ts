import React from "react";

export default function setRef<T>(ref: React.Ref<T> | undefined, node: T) {
    if (ref === undefined) return;

    if (typeof ref === "function") {
        ref(node);
    } else if (ref) {
        // @ts-ignore
        ref.current = node;
    }
}
