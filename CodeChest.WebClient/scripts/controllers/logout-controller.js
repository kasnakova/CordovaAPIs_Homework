define(["jquery", "AuthModel"], function($, AuthModel) {
    "use strict";

    var LogoutController;
    LogoutController = (function() {
        function LogoutController(apiUrl) {
            this.authModel = new AuthModel(apiUrl);
            this._initializeLogout();
        }

        LogoutController.prototype._initializeLogout = function() {
            this.authModel.logoutUser().then(
                function (data) {
                    //
                },
                function (msg) {
                    console.error("Error: " + msg);
                }
            );
        };

        return LogoutController;
    }());

    return LogoutController;
});