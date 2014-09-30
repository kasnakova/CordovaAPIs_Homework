define(["jquery", "AuthModel"], function($, AuthModel) {
    "use strict";

    var RegisterController;
    RegisterController = (function() {
        function RegisterController(apiUrl) {
            this._bindOnAvatarSubmit();
            this.authModel = new AuthModel(apiUrl);
        }

        RegisterController.prototype._bindOnAvatarSubmit = function() {
            var self = this;

            $(document).on("submit", "#sign-up-form", function() {
                var $this = $(this),
                    data = {
                        username: $this.find("input[name='username']").val(),
                        password: $this.find("input[name='password']").val(),
                        confirmPassword: $this.find("input[name='rep-password']").val(),
                        email: $this.find("input[name='email']").val()
                    };

                self.authModel.registerUser(data);
            });
        };

        return RegisterController;
    }());

    return RegisterController;
});