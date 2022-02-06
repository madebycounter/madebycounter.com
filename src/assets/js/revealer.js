function reveal() {
    var reveals = document.querySelectorAll(".reveal-150");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        reveals[i].classList.add("active");
        if (elementTop < windowHeight - elementVisible) {
        } else {
            // reveals[i].classList.remove("active");
        }
    }

    var earlyReveals = document.querySelectorAll(".reveal-0");

    for (var i = 0; i < earlyReveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = earlyReveals[i].getBoundingClientRect().top;
        var elementVisible = 0;

        earlyReveals[i].classList.add("active");
        if (elementTop < windowHeight - elementVisible) {
        } else {
            // earlyReveals[i].classList.remove("active");
        }
    }
}

$(window).scroll(reveal);
$(window).resize(reveal);
$(window).load(reveal);
