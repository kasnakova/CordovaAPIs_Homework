define(function() {
    "use strict";

    var SearchController;
    SearchController = (function() {
        function SearchController() {}

        SearchController.prototype.translateSearchParams = function(sParams) {
            var parameters = {
                    langs: [],
                    users: [],
                    phrase: ""
                },
                lastCloseAt = -1,
                filterResult,
                opensAt,
                filter,
                i;

            for (i = 0; i < sParams.length; i += 1) {
                if (sParams[i] === "[") {
                    opensAt = i + 1;
                } else if (sParams[i] === "]" && opensAt) {
                    filter = sParams.substring(opensAt, i);
                    filterResult = this._determineFilter(filter);
                    lastCloseAt = i;

                    if (filterResult !== null) {
                        parameters[filterResult.type].push(filterResult.val);
                    }
                }
            }

            if (lastCloseAt === -1) {
                parameters.phrase = sParams;
            } else {
                parameters.phrase = sParams.substring(lastCloseAt + 1, sParams.length).trim();
            }

            return parameters;
        };

        SearchController.prototype._determineFilter = function(filter) {
            if (filter.stringMatch("user:[a-zA-Z0-9_]+")) {
                return {
                    type: "users",
                    val: filter.replace("user:", "").trim()
                };
            } else if(filter.stringMatch("[a-zA-Z-#\+.]+")) {
                return {
                    type: "langs",
                    val: filter
                };
            }

            return null;
        };

        return SearchController;
    }());

    return SearchController;
});