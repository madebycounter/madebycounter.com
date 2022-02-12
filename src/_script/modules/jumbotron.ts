import $ from "jquery";
import { debounce } from "../util";

var _jumbotron_scrolling = false;

function jumbotron() {
    if (!_jumbotron_scrolling) {
        var navHeight = $("#_jumbotron_nav").outerHeight() || 0;
        var windowHeight = window.innerHeight;

        $("#_jumbotron").outerHeight(windowHeight - navHeight);
    }
}

export function initJumbotrons() {
    $(window).on(
        "scroll",
        debounce(250, function () {
            _jumbotron_scrolling = true;
        })
    );

    $(window).on(
        "scroll",
        debounce(250, function () {
            _jumbotron_scrolling = false;
        })
    );

    $("#_jumbotron_nav").on("load", jumbotron);
    $(window).on("load", jumbotron);
    $(window).on("resize", jumbotron);
    jumbotron();
}
