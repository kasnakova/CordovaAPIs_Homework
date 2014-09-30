define(["jquery", "q", "AuthController"], function($, Q, AuthController) {
    "use strict";

    var AuthModel;
    AuthModel = (function() {
        function AuthModel(apiUrl) {
            this.apiUrl = apiUrl;
        }

        AuthModel.prototype.registerUser = function(dataObj) {
            var deferred = Q.defer();

            $.ajax({
                url: this.apiUrl + "api/Account/Register",
                type: "POST",
                data: dataObj,
                success: function(msg) {
                    deferred.resolve(msg);
                },
                error: function(msg) {
                    deferred.reject(msg);
                }
            });

            return deferred.promise;
        };

        AuthModel.prototype.loginUser = function(dataObj) {
            var deferred = Q.defer();

            $.ajax({
                url: this.apiUrl + "Token",
                type: "POST",
                data: dataObj,
                success: function(data) {
                    deferred.resolve(data);
                },
                error: function(msg) {
                    deferred.reject(msg);
                }
            });

            return deferred.promise;
        };

        AuthModel.prototype.logoutUser = function() {
            var deferred = Q.defer();

            $.ajax({
                url: this.apiUrl + "api/Account/Logout",
                type: "POST",
                headers: {
                    "Authorization": AuthController.giveMeAuthorization()
                },
                success: function(msg) {
                    deferred.resolve(msg);
                },
                error: function(msg) {
                    deferred.resolve(msg);
                }
            });

            return deferred.promise;
        };

        return AuthModel;
    }());

    return AuthModel;
});