define(["jquery", "q"], function($, Q) {
    "use strict";

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

        return FakeDataModel;
    }());

    return FakeDataModel;
});