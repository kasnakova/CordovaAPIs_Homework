define(["jquery", "AuthModel"], function($, AuthModel) {
    "use strict";

    var LoginController;
    LoginController = (function() {
        function LoginController(apiUrl) {
            this._bindSubmitEvent();
            this.authModel = new AuthModel(apiUrl);
        }

        LoginController.prototype._bindSubmitEvent = function() {
            var self = this;

            $(document).on("click", "#sign-in-form > button", function() {
                var $this = $(this),
                    $form = $this.parent(),
                    data = {
                        username: $form.find("input[name='username']").val(),
                        password: $form.find("input[name='password']").val(),
                        grant_type: "password"
                    };

                self.authModel.loginUser(data).then(
                    function (data) {
                        console.log(data);
                    },
                    function (msg) {
                        console.error("Error: " + msg);
                    }
                );

                alert("asdasdas");
            });
        };

        return LoginController;
    }());

    return LoginController;
});