define([
    "jquery",
    "handlebars",
    "q",
    "AuthController",
    "SearchController",
    "RegisterController",
    "LoginController",
    "SnippetsController",
    "UserController",
    "SnippetsModel",
    "FakeDataModel",
    "HandlebarsHelper"],
    function($, Handlebars, Q, AuthController, SearchController, RegisterController, LoginController, SnippetsController, UserController, SnippetsModel,  FakeDataModel) {

    "use strict";

    var ViewsController;
    ViewsController = (function() {
        var TRANS_MS = 400,
            Paths = {
            LOGGED_IN_HTML: "views/logged-in-header.html",
            LOGGED_OUT_HTML: "views/logged-out-header.html",
            SIGN_IN_HTML: "views/sign-in.html",
            SIGN_UP_HTML: "views/sign-up.html",
            USER_SNIP_HTML: "views/user-snippets.html",
            ADD_SNIP_HTML: "views/add-snippet.html",
            SNIPPET_HTML: "views/snippet.html",
            USR_SETTINGS_HTML: "views/user-settings.html",
            USR_SEC_SET_HTML: "views/user-security-settings.html",
            LOGGED_IN_IDX: "views/logged-in-index.html",
            TOP_SNIPPETS_TEMPL: "views/templates/index-top-snippets-template.html",
            SEARCH_TEMPL: "views/templates/search-results-template.html",
            LANG_LIST_TEMPL: "views/templates/lang-list-template.html",
            SNIPPETS_LIST_TEMPL: "views/templates/snippets-list-template.html"
        };

        function _clearWrapper() {
            this.wrapper.html("");
        }

        function ViewsController(wrapper, apiUrl) {
            this.wrapper = $(wrapper);
            this.data = new FakeDataModel();
            this.apiUrl = apiUrl;
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
            var self = this,
                controller;

            if (!AuthController.isLoggedIn()) {
                this._routineLoad(Paths.SIGN_IN_HTML);
                controller = new LoginController(this.apiUrl, function() {
                    self.loadHeader();
                    self.home();
                });
            } else {
                this.home();
            }
        };

        ViewsController.prototype.loadSignUp = function() {
            var controller;

            if (!AuthController.isLoggedIn()) {
                this._routineLoad(Paths.SIGN_UP_HTML);
                controller = new RegisterController(this.apiUrl);
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
                    self.wrapper.html(compiled(data)).hide().fadeIn(TRANS_MS);
                });
            });
        };

        ViewsController.prototype.loadSnippet = function(id) {
            var self = this,
                dataModel = new SnippetsModel(this.apiUrl);

            _clearWrapper.call(this);
            $.get(Paths.SNIPPET_HTML, function(templ) {
                var compiled = Handlebars.compile(templ);

                dataModel.getSnippet(id).then(
                    function(data) {
                        data.isOwner = true;

                        require(["prism"], function(Prism) {
                            self.wrapper.html(compiled(data));
                            Prism.highlightAll();
                        });
                    },
                    function() {
                        self.home();
                    }
                );
            });
        };

        // Slow unfortunately
        // TODO Sort of caching
        ViewsController.prototype.userIndex = function(language, page) {
            if (!AuthController.isLoggedIn()) {
                this.home();
                return;
            }

            var self = this;

            $.get(Paths.USER_SNIP_HTML, function(data) {
                self.wrapper.html(data);

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

                $.get(Paths.SNIPPETS_LIST_TEMPL, function(data) {
                    var $mainContent = $("#main-content"),
                        templateHtml,
                        compiled;

                    $mainContent.html(data);
                    templateHtml = $("#snippets-list-template").html();
                    compiled = Handlebars.compile(templateHtml);

                    self.data.getSnippetsList().then(function(list) {
                        $mainContent.html(compiled(list)).hide().fadeIn(TRANS_MS);
                    });
                });
            });
        };

        ViewsController.prototype.addSnippet = function() {
            if (!AuthController.isLoggedIn()) {
                this.home();
                return;
            }

            this._routineLoad(Paths.ADD_SNIP_HTML);
            var controller = new SnippetsController(this.apiUrl);
        };

        ViewsController.prototype.loadProfileSettings = function() {
            if (!AuthController.isLoggedIn()) {
                this.home();
                return;
            }

            var self = this,
                controller;

            _clearWrapper.call(this);
            $.get(Paths.USR_SETTINGS_HTML, function(templ) {
                var compiled = Handlebars.compile(templ);

                self._setHtml(compiled(AuthController.getAuth()));
            });

            controller = new UserController(this.apiUrl);
            controller.bindOnAvatarSubmit();
        };

        ViewsController.prototype.loadSecuritySettings = function() {
            if (!AuthController.isLoggedIn()) {
                this.home();
                return;
            }

            var self = this,
                controller;

            _clearWrapper.call(this);
            $.get(Paths.USR_SEC_SET_HTML, function(templ) {
                var compiled = Handlebars.compile(templ);

                self._setHtml(compiled(AuthController.getAuth()));
            });

            controller = new UserController(this.apiUrl);
            controller.bindOnPasswordSubmit();
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
                    $("#top-snippets").html(compiled({
                        lists: data
                    })).hide().fadeIn(TRANS_MS);
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