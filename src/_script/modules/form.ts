import $ from "jquery";

import { FORM_URL } from "../globals";
import { openModal } from "./modals";

export function submitContact(theme: string) {
    var name = $("#_name").val() as string;
    var email = $("#_email").val() as string;
    var msg = $("#_msg").val() as string;
    var origin = $("#_origin").val() as string;

    var firstName = name.split(" ")[0];

    $.ajax({
        type: "POST",
        url: FORM_URL,
        headers: {
            Accept: "application/json",
        },
        data: {
            name: name,
            email: email,
            message: msg,
            origin: origin,
        },
        success: (data) => {
            openModal("_form_success", theme, {
                message: `Thanks, ${firstName}! We'll be in touch shortly.`,
            });
        },
        error: (xhr) => {
            var msg = JSON.parse(xhr.responseText);

            if (
                msg.error == "Validation errors" &&
                msg.errors.length != 0 &&
                msg.errors[0].field == "email"
            ) {
                openModal("_form_error", theme, {
                    message: "Invalid email address!",
                });
            } else {
                openModal("_form_error", theme, {
                    message: "An error occured. Please try again soon.",
                });
            }
        },
    });
}
