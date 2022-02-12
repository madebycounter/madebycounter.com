function reveal() {
    var reveals = document.querySelectorAll(".reveal-150");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }

    var earlyReveals = document.querySelectorAll(".reveal-0");

    for (var i = 0; i < earlyReveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = earlyReveals[i].getBoundingClientRect().top;
        var elementVisible = 0;

        if (elementTop < windowHeight - elementVisible) {
            earlyReveals[i].classList.add("active");
        } else {
            earlyReveals[i].classList.remove("active");
        }
    }
}

export function initRevealer() {
    $(window).on("scroll", reveal);
    $(window).on("resize", reveal);
    $(window).on("load", reveal);
}
