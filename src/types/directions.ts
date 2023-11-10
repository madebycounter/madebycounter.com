import { HorizontalGallery } from "../components/media/Gallery";

export type HorizontalDirection = "left" | "right";

export type VerticalDirection = "up" | "down";

export type Direction = HorizontalDirection | VerticalDirection;

export function isHorizontal(direction: Direction): boolean {
    return direction === "left" || direction === "right";
}

export function isVertical(direction: Direction): boolean {
    return direction === "up" || direction === "down";
}

export function invertHorizontal(
    direction: HorizontalDirection,
): HorizontalDirection {
    switch (direction) {
        case "left":
            return "right";
        case "right":
            return "left";
    }
}

export function invertVertical(
    direction: VerticalDirection,
): VerticalDirection {
    switch (direction) {
        case "up":
            return "down";
        case "down":
            return "up";
    }
}

export function invertDirection(direction: Direction): Direction {
    switch (direction) {
        case "left":
            return "right";
        case "right":
            return "left";
        case "up":
            return "down";
        case "down":
            return "up";
    }
}
