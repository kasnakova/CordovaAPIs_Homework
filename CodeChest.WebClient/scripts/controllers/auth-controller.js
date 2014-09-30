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

            return data.name !== null && data.token !== null;
        };

        AuthController.getAuth = function() {
            var authString = localStorage.getItem(AUTH_KEY);

            return JSON.parse(authString);
        };

        AuthController.setAuth = function(data) {
            var obj = {
                name: data["userName"],
                token: data["access_token"],
                tokenType: data["token_type"],
                expiresIn: data[".expires"],
                avatar: "img/def_avatar.png"
            };

            localStorage.setItem(AUTH_KEY, JSON.stringify(obj));
        };

        AuthController.giveMeAuthorization = function() {
            var authObj = this.getAuth();

            return authObj.tokenType + " " + authObj.token;
        };

        AuthController.removeAuth = function() {
            localStorage.removeItem(AUTH_KEY);
        };

        return AuthController;
    }());

    return AuthController;
});