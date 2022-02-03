$(() => {
    $(".modal").each((_, elem) => {
        var id = $(elem).attr("id");
        
        $(`#${id}_close`).click((evt) => {
            evt.preventDefault();
            closeModal(id);
        });
    });
});

function openModal(id, theme, data) {
    $(`#${id}`).removeClass("theme-dark");
    $(`#${id}`).removeClass("theme-light");
    $(`#${id}`).addClass(theme);

    for (let dataId in data) {
        console.log(dataId, data);
        $(`#${id}_${dataId}`).text(data[dataId]);
    }

    $(`#${id}`).removeClass("hidden");
}

function closeModal(id) {
    $(`#${id}`).addClass("hidden");
}