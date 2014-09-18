define(["jquery", "RegisterModel"], function($, RegisterModel) {
    "use strict";

    var RegisterController;
    RegisterController = (function() {
        function RegisterController(apiUrl) {
            this._bindSubmitEvent();
            this.registerModel = new RegisterModel(apiUrl);
        }

        RegisterController.prototype._bindSubmitEvent = function() {
            $(document).on("click", "#sign-up-form > button", function() {
                var $this = $(this),
                    data = {
                        username: $this.siblings("input[name='username']:first-child").val(),
                        password: $this.siblings("input[name='password']:first-child").val(),
                        email: $this.siblings("input[name='email']:first-child").val()
                    };

                this.registerModel.registerUser(data);
                alert("asd");
            });
        };

        return RegisterController;
    }());

    return RegisterController;
});