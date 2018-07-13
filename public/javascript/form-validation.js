$(function() {
    $("#form-login").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8,
                equalTo: "#newInputPassword"
            },
            newPassword: {
                required: true,
                minlength: 8
            }
        },
        messages: {
            password: {
                required: "Nhập password",
                minlength: "Chiều dài tối thiểu 8 ký tự",
                equalTo : "Password không khớp"
            },
            newPassword: {
                required: "Nhập password",
                minlength: "Chiều dài tối thiểu 8 ký tự"
            },
            email: "Nhập email"
        },
        submitHandler: function(form) {
            form.submit();
        }
    });
});