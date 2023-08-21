import React, {
    useRef,
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";

type RevealerProps = {
    scrollOffset?: number;
    asSpan?: boolean;
    trigger?: React.RefObject<HTMLElement>;
    className?: string;
    children?: React.ReactNode;
};

const Revealer = forwardRef(
    (
        {
            children,
            className,
            scrollOffset = 0,
            asSpan = false,
            trigger,
        }: RevealerProps,
        ref: React.Ref<HTMLDivElement>,
    ) => {
        const [state, setState] = useState({ visible: false });
        const innerRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

        const setVisible = (visible: boolean) => {
            if (visible === state.visible) return;

            setState({ visible: visible });
        };

        const checkVisibility = useDebouncedCallback(() => {
            var triggerCurrent = trigger ? trigger.current : null;
            var refCurrent = innerRef ? innerRef.current : null;

            var elem;
            if (trigger) elem = triggerCurrent;
            else if (innerRef) elem = refCurrent;
            else return;

            if (!elem) return;

            var windowHeight = window.innerHeight;
            var elementTop = elem.getBoundingClientRect().top;

            if (elementTop < windowHeight - scrollOffset) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        }, 25);

        useEffect(() => {
            window.addEventListener("load", checkVisibility);
            window.addEventListener("resize", checkVisibility);
            window.addEventListener("scroll", checkVisibility, {
                passive: true,
            });
            checkVisibility();

            return () => {
                window.removeEventListener("load", checkVisibility);
                window.removeEventListener("resize", checkVisibility);
                window.removeEventListener("scroll", checkVisibility);
            };
        });

        if (asSpan) {
            return (
                <span
                    ref={innerRef}
                    className={`${className} ${state.visible ? "active" : ""}`}
                >
                    {children}
                </span>
            );
        }

        return (
            <div
                ref={innerRef}
                className={`${className} ${state.visible ? "active" : ""}`}
            >
                {children}
            </div>
        );
    },
);

type FadeRevealProps = {
    duration: number;
};

const FadeReveal = styled(Revealer)<FadeRevealProps>`
    opacity: 0;
    transition: opacity ease-in-out ${({ duration }) => duration}ms;

    &.active {
        opacity: 1;
    }
`;

type DirectionRevealProps = {
    offsetX: number;
    offsetY: number;
    duration?: number;
};

const DirectionReveal = styled(FadeReveal)<DirectionRevealProps>`
    transition:
        opacity ease-in-out ${({ duration }) => duration}ms,
        transform ease-in ${({ duration }) => duration}ms;
    transform: translate(
        ${(props) => props.offsetX}px,
        ${(props) => props.offsetY}px
    );

    &.active {
        transform: translate(0, 0);
    }
`;

export { FadeReveal, DirectionReveal };
export default Revealer;
