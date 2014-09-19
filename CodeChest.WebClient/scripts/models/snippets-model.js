define(["jquery", "q", "AuthController"], function($, Q, AuthController) {
    "use strict";

    var SnippetsModel;
    SnippetsModel = (function() {
        function SnippetsModel(apiUrl) {
            this.apiUrl = apiUrl;
        }

        SnippetsModel.prototype.postSnippet = function(dataObj) {
            var deferred = Q.defer();

            $.ajax({
                url: this.apiUrl + "api/CodeSnipets/Create",
                type: "POST",
                data: dataObj,
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

        SnippetsModel.prototype.getSnippet = function(snippetId) {
            var deferred = Q.defer();

            $.ajax({
                url: this.apiUrl + "api/CodeSnipets/ById?id=" + snippetId,
                type: "GET",
                success: function(data) {
                    deferred.resolve(data);
                },
                error: function(err) {
                    deferred.resolve(err);
                }
            });

            return deferred.promise;
        };

        SnippetsModel.prototype.modifySnippet = function(snippetId, dataObj) {
            var deferred = Q.defer();

            $.ajax({
                url: this.apiUrl + "api/CodeSnipets/Update?id=" + snippetId,
                type: "PUT",
                data: dataObj,
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

        return SnippetsModel;
    }());

    return SnippetsModel;
});