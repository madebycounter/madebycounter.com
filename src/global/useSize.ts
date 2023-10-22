import React, { useEffect, useRef, useState } from "react";

export default function useSize<T extends HTMLElement>(): [
    React.RefObject<T>,
    { width: number; height: number },
] {
    const ref = useRef<T>(null);
    const [state, setState] = useState({
        width: 0,
        height: 0,
    });

    function onResize() {
        if (!ref.current) return;

        const { width, height } = ref.current.getBoundingClientRect();

        setState({
            width,
            height,
        });
    }

    useEffect(() => {
        if (!ref.current) return;

        const observer = new ResizeObserver(onResize);
        observer.observe(ref.current);

        return () => {
            ref.current && observer.unobserve(ref.current);
        };
    }, []);

    return [ref, state];
}
