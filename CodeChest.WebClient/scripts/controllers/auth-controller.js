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

        // TODO: Find a better solution
        AuthController.isLoggedIn = function() {
            var data;

            if (typeof localStorage[AUTH_KEY] === "undefined") {
                return false;
            }

            data = this.getAuth();

            return data.username !== null && data.sessionKey !== null;
        };

        AuthController.getAuth = function() {
            var authString = localStorage.getItem(AUTH_KEY);

            return JSON.parse(authString);
        };

        AuthController.setAuth = function(data) {
            localStorage.setItem(AUTH_KEY, JSON.stringify(data));
        };

        AuthController.removeAuth = function() {
            localStorage.removeItem(AUTH_KEY);
        };

        return AuthController;
    }());

    return AuthController;
});