define(["handlebars"], function(Handlebars) {
    "use strict";

    Handlebars.registerHelper("starRating", function(rating) {
        var STAR_COUNT = 5,
            starsHtml = "",
            i;

        for (i = 0; i < STAR_COUNT; i += 1) {
            if (i < rating) {
                starsHtml += "<div class=\"sm-star marked\"></div>";
            } else {
                starsHtml += "<div class=\"sm-star\"></div>";
            }
        }

        return starsHtml;
    });
});