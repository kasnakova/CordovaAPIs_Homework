define(["handlebars", "AuthController"], function(Handlebars, AuthController) {
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

    Handlebars.registerHelper("paging", function(totalPages, currentPage) {
        var pagesHtml = "",
            urlParams = window.location.hash.split("/"),
            url,
            i;

        for (i = 1; i <= totalPages; i += 1) {
            urlParams[urlParams.length - 1] = i;
            url = urlParams.join("/");

            if (i === currentPage) {
                pagesHtml += '<a href="' + url + '" class="title selected">' + i + '</a> ';
            } else {
                pagesHtml += '<a href="' + url + '" class="title">' + i + '</a> ';
            }
        }

        return pagesHtml;
    });

    Handlebars.registerHelper("isAuthor", function(username, options) {
        if (AuthController.getAuth().name === username) {
            return options.fn(this);
        }

        return options.inverse(this);
    });
});