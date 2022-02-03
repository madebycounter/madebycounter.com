function jumbotron() {
    var navHeight = $("#_jumbotron_nav").outerHeight() || 0;
    var windowHeight = window.innerHeight;

    $("#_jumbotron").outerHeight(windowHeight - navHeight);
}

$(window).load(jumbotron);
$(window).resize(jumbotron);
