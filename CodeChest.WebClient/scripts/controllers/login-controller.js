define(["jquery", "AuthModel", "AuthController"], function($, AuthModel, AuthController) {
    "use strict";

    var LoginController;
    LoginController = (function() {
        function LoginController(apiUrl, callback) {
            this.authModel = new AuthModel(apiUrl);
            this._bindOnAvatarSubmit(callback);
        }

        LoginController.prototype._bindOnAvatarSubmit = function(callback) {
            var self = this;

            $(document).on("submit", "#sign-in-form", function(e) {
                var $this = $(this),
                    status = true,
                    data = {
                        "username": $this.find("input[name='username']").val(),
                        "password": $this.find("input[name='password']").val(),
                        "grant_type": "password"
                    };

                self.authModel.loginUser(data).then(
                    function (data) {
                        AuthController.setAuth(data);
                        callback();
                    },
                    function (msg) {
                        console.error("Error: " + msg);
                    }
                );
            });
        };

        return LoginController;
    }());

    return LoginController;
});