define(["jquery", "q", "AuthController"], function($, Q, AuthController) {
    "use strict";

    var UserModel;
    UserModel = (function() {
        function UserModel(apiUrl) {
            this.apiUrl = apiUrl;
        }

        UserModel.prototype.changeAvatar = function(location) {
            var deferred = Q.defer();

            $.ajax({
                url: this.apiUrl + "api/Account/ChangeAvatar?avatarLocationUrl=" + location,
                type: "POST",
                headers: {
                    "Authorization": AuthController.giveMeAuthorization()
                },
                success: function(msg) {
                    deferred.resolve(msg);
                },
                error: function(msg) {
                    deferred.reject(msg);
                }
            });

            return deferred.promise;
        };

        UserModel.prototype.changePassword = function(dataObj) {
            var deferred = Q.defer();

            $.ajax({
                url: this.apiUrl + "api/Account/ChangePassword",
                type: "POST",
                data: dataObj,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                headers: {
                    "Authorization": AuthController.giveMeAuthorization()
                },
                success: function(msg) {
                    deferred.resolve(msg);
                },
                error: function(msg) {
                    deferred.reject(msg);
                }
            });

            return deferred.promise;
        };

        return UserModel;
    }());

    return UserModel;
});