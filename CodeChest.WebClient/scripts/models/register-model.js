define(["jquery", "q"], function($, Q) {
    "use strict";

    var RegisterModel;
    RegisterModel = (function() {
        function RegisterModel(apiUrl) {
            this.apiUrl = apiUrl;
        }

        RegisterModel.prototype.registerUser = function(dataObj) {
            var deferred = Q.defer();

            $.ajax({
                url: this.apiUrl + "Api/Register",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(dataObj),
                success: function(msg) {
                    console.log(msg);
                    deferred.resolve(msg);
                },
                error: function(msg) {
                    console.log(msg);
                    deferred.reject(msg);
                }
            });

            return deferred.promise;
        };

        return RegisterModel;
    }());

    return RegisterModel;
});