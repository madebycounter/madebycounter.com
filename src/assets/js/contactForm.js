function submitContact(theme) {
    var name = $("#_name").val();
    var email = $("#_email").val();
    var msg = $("#_msg").val();
    var origin = $("#_origin").val();

    var firstName = name.split(" ")[0];

    $.ajax({
        type: "POST",
        url: _FORM_URL,
        headers: {
            Accept: "application/json"
        },
        data: {
            name: name,
            email: email,
            message: msg,
            origin: origin
        },
        success: (data) => {
            openModal("_form_success", theme, {
                message: `Thanks, ${firstName}! We'll be in touch shortly.`
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
                    message: "Invalid email address!"
                });
            } else {
                openModal("_form_error", theme, {
                    message: "An error occured. Please try again soon."
                });
            }
        }
    });
}
