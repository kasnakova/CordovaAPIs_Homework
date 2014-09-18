define(["jquery", "handlebars", "q", "AuthController", "SearchController", "FakeDataModel", "HandlebarsHelper"],
    function($, Handlebars, Q, AuthController, SearchController, FakeDataModel) {

    "use strict";

    var ViewsController;
    ViewsController = (function() {
        var Paths = {
            LOGGED_IN_HTML: "views/logged-in-header.html",
            LOGGED_OUT_HTML: "views/logged-out-header.html",
            SIGN_IN_HTML: "views/sign-in.html",
            SIGN_UP_HTML: "views/sign-up.html",
            USER_SNIP_HTML: "views/user-snippets.html",
            LOGGED_IN_IDX: "views/logged-in-index.html",
            TOP_SNIPPETS_TEMPL: "views/templates/index-top-snippets-template.html",
            SEARCH_TEMPL: "views/templates/search-results-template.html",
            LANG_LIST_TEMPL: "views/templates/lang-list-template.html"
        };

        function _clearWrapper() {
            this.wrapper.html("");
        }

        function ViewsController(wrapper) {
            this.wrapper = $(wrapper);
            this.data = new FakeDataModel();
        }

        ViewsController.prototype.home = function() {
            window.location = "#/";
        };

        ViewsController.prototype.loadHeader = function() {
            var headerAuth = $("#auth"),
                compiled;

            if (AuthController.isLoggedIn()) {
                $.get(Paths.LOGGED_IN_HTML, function(data) {
                    compiled = Handlebars.compile(data);

                    headerAuth.html(compiled(AuthController.getAuth()));
                });
            } else {
                $.get(Paths.LOGGED_OUT_HTML, function(data) {
                    headerAuth.html(data);
                });
            }
        };

        ViewsController.prototype.loadIndex = function() {
            _clearWrapper.call(this);

            if (!AuthController.isLoggedIn()) {
                this._publicIndex();
            } else {
                // Put first user language on place of 'C#'
                window.location = "#/snippets/C#/1";
            }
        };

        ViewsController.prototype.loadSignIn = function() {
            if (!AuthController.isLoggedIn()) {
                this._routineLoad(Paths.SIGN_IN_HTML);
            } else {
                this.home();
            }
        };

        ViewsController.prototype.loadSignUp = function() {
            if (!AuthController.isLoggedIn()) {
                this._routineLoad(Paths.SIGN_UP_HTML);
            } else {
                this.home();
            }
        };

        ViewsController.prototype.loadSearchResults = function(searchParams, page) {
            var searchConroller = new SearchController(),
                translatedParams = searchConroller.translateSearchParams(searchParams),
                self = this;
                // pass them to poster

            _clearWrapper.call(this);
            $.get(Paths.SEARCH_TEMPL, function(data) {
                var templateHtml,
                    compiled;

                self.wrapper.html(data);

                templateHtml = $("#search-results-template").html();
                compiled = Handlebars.compile(templateHtml);

                self.data.getSearchResults().then(function(data) {
                    self.wrapper.html(compiled(data)).hide().fadeIn(400);
                });
            });
        };

        ViewsController.prototype._publicIndex = function() {
            var self = this;

            $.get(Paths.TOP_SNIPPETS_TEMPL, function(data) {
                var templateHtml,
                    compiled;

                self.wrapper.html(data);

                templateHtml = $("#top-snippets-template").html();
                compiled = Handlebars.compile(templateHtml);

                self.data.getTopSnippetsList().then(function(data) {
                    self.wrapper.html(compiled({
                        lists: data
                    })).hide().fadeIn(400);
                });
            });
        };

        // Slow unfortunately
        // TODO Sort of caching
        ViewsController.prototype.userIndex = function(language, page) {
            var self = this;

            $.get(Paths.USER_SNIP_HTML, function(data) {
                self.wrapper.html(data);

                // Frame
                $.get(Paths.LANG_LIST_TEMPL, function(templ) {
                    var compiled = Handlebars.compile(templ),
                        langList = $("#lang-list");

                    // Language list
                    self.data.getLanguageList().then(function(list) {
                        langList.html(compiled({
                            languages: list
                        }));

                        langList.find("li[data-info=" + language + "]").addClass("selected");
                    });
                });
            });
        };

        ViewsController.prototype._routineLoad = function(path) {
            var self = this;

            _clearWrapper.call(this);
            $.get(path, function(data) {
                self._setHtml(data);
            });
        };

        ViewsController.prototype._setHtml = function(html) {
            this.wrapper.html(html).hide().fadeIn(450);
        };

        return ViewsController;
    }());

    return ViewsController;
});