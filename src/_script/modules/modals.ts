import $ from "jquery";

export function openModal(id: string, theme: string, data: any) {
    $(`#${id}`).removeClass("theme-dark");
    $(`#${id}`).removeClass("theme-light");
    $(`#${id}`).addClass(theme);

    for (let dataId in data) {
        console.log(dataId, data);
        $(`#${id}_${dataId}`).text(data[dataId]);
    }

    $(`#${id}`).removeClass("hidden");
}

export function closeModal(id: string) {
    $(`#${id}`).addClass("hidden");
}

export function initModals() {
    $(".modal").each((_, elem) => {
        var id = $(elem).attr("id");

        $(`#${id}_close`).on("click", (evt: JQuery.ClickEvent) => {
            evt.preventDefault();
            closeModal(id);
        });
    });
}
