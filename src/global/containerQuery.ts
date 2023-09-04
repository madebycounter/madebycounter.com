import { useEffect, useRef, useState } from "react";

type ContainerQuery = {
    [key: string]: {
        min?: number;
        max?: number;
    };
};

export default function useContainerQuery<T extends Element>(
    query: ContainerQuery,
): [string[], React.MutableRefObject<T | null>] {
    const node = useRef<T>(null);
    const [matches, setMatches] = useState<string[]>([]);

    useEffect(() => {
        if (!node.current) return;

        const observer = new ResizeObserver((entries) => {
            var width = entries[0].contentRect.width;
            var newMatches: string[] = [];

            Object.keys(query).forEach((key) => {
                var { min = 0, max = Infinity } = query[key];
                if (width >= min && width <= max) newMatches.push(key);
            });

            setMatches(newMatches);
        });

        observer.observe(node.current);

        return () => observer.disconnect();
    }, [node]);

    return [matches, node];
}
