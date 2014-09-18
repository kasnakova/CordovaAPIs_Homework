define(["jquery", "AuthModel"], function($, AuthModel) {
    "use strict";

    var RegisterController;
    RegisterController = (function() {
        function RegisterController(apiUrl) {
            this._bindSubmitEvent();
            this.authModel = new AuthModel(apiUrl);
        }

        RegisterController.prototype._bindSubmitEvent = function() {
            var self = this;

            $(document).on("click", "#sign-up-form > button", function() {
                var $this = $(this),
                    $form = $this.parent(),
                    data = {
                        username: $form.find("input[name='username']").val(),
                        password: $form.find("input[name='password']").val(),
                        confirmPassword: $form.find("input[name='rep-password']").val(),
                        email: $form.find("input[name='email']").val()
                    };

                self.authModel.registerUser(data);
            });
        };

        return RegisterController;
    }());

    return RegisterController;
});