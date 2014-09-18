define(function() {
    "use strict";

    /*
     * Authentication Controller
     * Manages authentication data in local storage
     */
    var AuthController;
    AuthController = (function() {
        var AUTH_KEY = "user_auth";

        function AuthController() {}

        AuthController.apiUrl = null;

        // TODO: Find a better solution
        AuthController.isLoggedIn = function() {
            var data;

            if (typeof localStorage[AUTH_KEY] === "undefined") {
                return false;
            }

            data = this.getAuth();

            return data.name !== null && data.sessionKey !== null;
        };

        AuthController.getAuth = function() {
            var authString = localStorage.getItem(AUTH_KEY);

            return JSON.parse(authString);
        };

        AuthController.setAuth = function(data) {
            var obj = {
                user: data.userName,
                token: data.access_token,
                tokenType: data.token_type,
                expiresIn: data.expires_in
            };

            localStorage.setItem(AUTH_KEY, JSON.stringify(obj));
        };

        AuthController.removeAuth = function() {
            localStorage.removeItem(AUTH_KEY);
        };

        return AuthController;
    }());

    return AuthController;
});