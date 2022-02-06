var _jumbotron_scrolling = false;

function jumbotron() {
    if (!_jumbotron_scrolling) {
        var navHeight = $("#_jumbotron_nav").outerHeight() || 0;
        var windowHeight = window.innerHeight;

        $("#_jumbotron").outerHeight(windowHeight - navHeight);
    }
}

$(window).scroll(
    $.debounce(250, true, function () {
        _jumbotron_scrolling = true;
    })
);

$(window).scroll(
    $.debounce(250, function () {
        _jumbotron_scrolling = false;
    })
);

$("#_jumbotron_nav").load(jumbotron);
$(window).load(jumbotron);
$(window).resize(jumbotron);
jumbotron();
