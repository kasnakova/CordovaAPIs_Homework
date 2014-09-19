define(["handlebars", "AuthController"], function(Handlebars, AuthController) {
    "use strict";

    var LANG_ENUM = [{ enumName: "Markup", actualName: "Markup", className: "markup" },
        { enumName: "Twig", actualName: "Twig", className: "twig" },
        { enumName: "Css", actualName: "CSS", className: "css" },
        { enumName: "CssExtras", actualName: "CSS Extras", className: "css-extras" },
        { enumName: "CLike", actualName: "C-Like", className: "clike" },
        { enumName: "Javascript", actualName: "Javascript", className: "javascript" },
        { enumName: "Java", actualName: "Java", className: "java" },
        { enumName: "Php", actualName: "PHP", className: "php" },
        { enumName: "PhpExtras", actualName: "PHP Extras", className: "php-extras" },
        { enumName: "CoffeeScript", actualName: "CoffeeScript", className: "coffeescript" },
        { enumName: "Sass", actualName: "SASS", className: "sass" },
        { enumName: "Bash", actualName: "Bash", className: "bash" },
        { enumName: "C", actualName: "C", className: "c" },
        { enumName: "CPlusPlus", actualName: "C++", className: "cpp" },
        { enumName: "Python", actualName: "Python", className: "python" },
        { enumName: "Sql", actualName: "SQL", className: "sql" },
        { enumName: "Groovy", actualName: "Groovy", className: "groovy" },
        { enumName: "Http", actualName: "HTTP", className: "http" },
        { enumName: "Ruby", actualName: "Ruby", className: "ruby" },
        { enumName: "Rip", actualName: "Rip", className: "rip" },
        { enumName: "Gherkin", actualName: "Gherkin", className: "gherkin" },
        { enumName: "CSharp", actualName: "C#", className: "csharp" },
        { enumName: "Go", actualName: "Go", className: "go" },
        { enumName: "Nsis", actualName: "NSIS", className: "nsis" },
        { enumName: "AspNet", actualName: "ASP.NET", className: "aspnet" },
        { enumName: "Scala", actualName: "Scala", className: "scala" },
        { enumName: "Haskell", actualName: "Haskell", className: "haskell" },
        { enumName: "Swift", actualName: "Swift", className: "swift" },
        { enumName: "ObjectiveC", actualName: "Objective-C", className: "objectivec" },
        { enumName: "AutoHotkey", actualName: "AutoHotkey", className: "autohotkey" },
        { enumName: "Ini", actualName: "Ini", className: "ini" },
        { enumName: "Latex", actualName: "LaTeX", className: "latex" },
        { enumName: "Apache", actualName: "Apache Config", className: "apacheconf" },
        { enumName: "Git", actualName: "Git", className: "git" }];

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

    Handlebars.registerHelper("getLangById", function(id) {
        return LANG_ENUM[id].actualName;
    });

    Handlebars.registerHelper("getLangClassById", function(id) {
        return "language-" + LANG_ENUM[id].className;
    });

    Handlebars.registerHelper("generateLangOptions", function(selectedId) {
        var options = "",
            lang,
            i;

        for (i = 0; i < LANG_ENUM.length; i += 1) {
            lang = LANG_ENUM[i];

            if (selectedId === i) {
                options += '<option value="' + lang.enumName + '" selected>' + lang.actualName + '</option>';
            } else {
                options += '<option value="' + lang.enumName + '">' + lang.actualName + '</option>';
            }
        }

        return options;
    });

    Handlebars.registerHelper("getLangName", function(enumName) {
        var name;

        LANG_ENUM.forEach(function(item) {
            if (enumName === item.enumName) {
                name = item.actualName;
                return;
            }
        });

        return name;
    });
});