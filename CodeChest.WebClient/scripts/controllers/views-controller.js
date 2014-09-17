define(["jquery", "handlebars", "q", "AuthController", "FakeDataModel", "HandlebarsHelper"],
    function($, Handlebars, Q, AuthController, FakeDataModel) {

    "use strict";

    var ViewsController;
    ViewsController = (function() {
        var Paths = {
            LOGGED_IN_HTML: "views/logged-in-header.html",
            LOGGED_OUT_HTML: "views/logged-out-header.html",
            SIGN_IN_HTML: "views/sign-in.html",
            SIGN_UP_HTML: "views/sign-up.html",
            TOP_SNIPPETS_TEMPL: "views/templates/index-top-snippets-template.html"
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
            var self = this;

            _clearWrapper.call(this);
            $.get(Paths.TOP_SNIPPETS_TEMPL, function(data) {
                var templateHtml,
                    compiled;

                self.wrapper.html(data);

                templateHtml = $("#top-snippets-template").html();
                compiled = Handlebars.compile(templateHtml);

                self.data.getTopSnippetsList().then(function(data) {
                    $("#top-snippets").html(compiled({
                        lists: data
                    })).hide().fadeIn(400);
                });
            });
        };

        ViewsController.prototype.loadSignIn = function() {
            this._routineLoad(Paths.SIGN_IN_HTML);
        };

        ViewsController.prototype.loadSignUp = function() {
            this._routineLoad(Paths.SIGN_UP_HTML);
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