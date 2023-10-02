function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function formHslString(hue: number, saturation: number, lightness: number) {
    return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(
        lightness,
    )}%)`;
}

export function randomColor() {
    return formHslString(random(0, 360), random(0, 100), random(0, 100));
}

export function randomMutedColor() {
    return formHslString(random(0, 360), random(40, 60), 50);
}

export function randomTeamColor(idx: number) {
    switch (idx) {
        case 0: // green
            return formHslString(random(90, 140), 100, random(25, 40));
        case 1: // blue
            return formHslString(random(180, 220), 100, random(25, 40));
        case 2: // red
            return formHslString(random(340, 370) % 360, 100, random(25, 40));
    }
}
