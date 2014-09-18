define(function() {
    "use strict";

    // String Match extension (works with regular expressions)
    String.prototype.stringMatch = function(regex) {
        var string = this.trim(),
            result = string.match(regex),
            parseResultToString;

        if (result === null) {
            return false;
        }

        parseResultToString = result.toString();

        return !(parseResultToString.length !== string.length);
    };
});