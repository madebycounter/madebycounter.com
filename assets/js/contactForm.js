function submitContact() {
    var name = $("#_name").val();
    var email = $("#_email").val();
    var msg = $("#_msg").val();
    var origin = $("#_origin").val();

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
            console.log(data);
        }
    });
}
