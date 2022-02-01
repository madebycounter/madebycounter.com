// Not used
var _phx_heroMaxWidth = 600;
var _phx_lrMaxWidth = 600;
var _phx_lrMinWidth = 340;
var _phx_offsetStart = 1400;
var _phx_lrCenterStart = 400;

function phxResize() {
    var parentWidth =
        $("#_phx_hero").width();

    var parentHeight =
        $("#_phx_hero").height();

    // resize phx logo
    var logoWidth = parentWidth;
    if (parentWidth >= _phx_heroMaxWidth) {
        logoWidth = _phx_heroMaxWidth;
    }

    $("#_phx_logo").width(logoWidth);
    
    var logoHeight = $("#_phx_logo").height();
    var left = (parentWidth - logoWidth) / 2 + parseInt($("#_phx_hero").css("padding-left"));
    var top = (parentHeight - logoHeight) / 2 + parseInt($("#_phx_hero").css("padding-top"));
    
    $("#_phx_logo").css("left", left);
    $("#_phx_logo").css("top", top);

    // resize phx left and right
    var lrWidth = parentWidth * 0.4;
    var lrVertical = -50;
    
    if (lrWidth >= _phx_lrMaxWidth) {
        lrWidth = _phx_lrMaxWidth;
    }

    if (lrWidth <= _phx_lrMinWidth) {
        lrWidth = _phx_lrMinWidth;
    }

    if (parentWidth <= _phx_lrCenterStart) {
        lrVertical = -50 + 0.2 * (_phx_lrCenterStart - parentWidth)
    }

    $("#_phx_left").width(lrWidth * 0.9);
    $("#_phx_right").width(lrWidth);
    $("#_phx_left").css("top", lrVertical);
    $("#_phx_right").css("bottom", lrVertical);

    var offset = 20;

    if (parentWidth < _phx_offsetStart) {
        offset = -0.2 * (_phx_offsetStart - parentWidth) + 20;
    }

    $("#_phx_left").css("left", offset - 10);
    $("#_phx_right").css("right", offset);
}

$(window).resize(phxResize);
$(window).on("load", phxResize);
$("#_phx_logo").on("load", phxResize);