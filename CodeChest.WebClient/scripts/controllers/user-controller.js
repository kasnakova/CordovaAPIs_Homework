define(["jquery", "UserModel"], function($, UserModel) {
    "use strict";

    var UserController;
    UserController = (function() {
        function UserController(apiUrl) {
            this.userModel = new UserModel(apiUrl);
        }

        UserController.prototype.bindOnAvatarSubmit = function() {
            var self = this;

            $(document).on("submit", "#change-avatar-form", function() {
                var $this = $(this),
                    location = $this.find("input[name='avatar-url']").val();

                self.userModel.changeAvatar(location).then(
                    function() {
                        console.log("Great success!");
                    },
                    function() {

                    }
                );
            });
        };

        UserController.prototype.bindOnPasswordSubmit = function() {
            var self = this;

            $(document).on("submit", "#change-password-form", function() {
                var $this = $(this),
                    data = {
                        oldPassword: $this.find("#old-password").val(),
                        newPassword: $this.find("#new-password").val(),
                        confirmPassword: $this.find("#rep-password").val()
                    };

                self.userModel.changePassword(data).then(
                    function() {
                        window.location = "#/logout";
                    },
                    function() {

                    }
                );
            });
        };

        return UserController;
    }());

    return UserController;
});