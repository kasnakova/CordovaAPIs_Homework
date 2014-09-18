define(["jquery", "q"], function($, Q) {
    "use strict";

    // NOTE: Testing purposes only
    var FakeDataModel;
    FakeDataModel = (function() {
        function FakeDataModel() {

        }

        FakeDataModel.prototype.getTopSnippetsList = function() {
            var deferred = Q.defer();

            $.getJSON("data/top-snippets-list.json", function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };

        FakeDataModel.prototype.getSearchResults = function() {
            var deferred = Q.defer();

            $.getJSON("data/search-results.json", function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };

       FakeDataModel.prototype.getLanguageList = function() {
           var deferred = Q.defer();

           $.getJSON("data/user-lang-list.json", function(data) {
                deferred.resolve(data);
           });

           return deferred.promise;
       };

        return FakeDataModel;
    }());

    return FakeDataModel;
});