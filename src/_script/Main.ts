import $ from "jquery";

import { submitContact } from "./modules/form";
import { initJumbotrons } from "./modules/jumbotron";
import { initModals } from "./modules/modals";
import { initRevealer } from "./modules/revealer";

export function submit(theme: string) {
    submitContact(theme);
}

$(() => {
    initModals();
    initJumbotrons();
    initRevealer();
});
