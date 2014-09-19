(function() {
    "use strict";

    require.config({
        paths: {
            "jquery": "libs/jquery-2.1.1.min",
            "sammy": "libs/sammy-0.7.5.min",
            "handlebars": "libs/handlebars-v1.3.0",
            "q": "libs/q-2.0",
            "prism": "libs/prism",
            "Init": "init",

            // Helpers
            "Extensions": "helpers/extensions",
            "HandlebarsHelper": "helpers/handlebars-helper",

            // Models
            "FakeDataModel": "models/fake-data-model",
            "AuthModel": "models/auth-model",
            "SnippetsModel": "models/snippets-model",
            "UserModel": "models/user-model",

            // Controllers
            "AuthController": "controllers/auth-controller",
            "ViewsController": "controllers/views-controller",
            "SearchController": "controllers/search-controller",
            "RegisterController": "controllers/register-controller",
            "LoginController": "controllers/login-controller",
            "LogoutController": "controllers/logout-controller",
            "SnippetsController": "controllers/snippets-controller",
            "UserController": "controllers/user-controller",
            "UiController": "controllers/ui-controller"
        },
        shim: {
            "handlebars": {
                "exports": "Handlebars"
            },
            "prism": {
                "exports": "Prism"
            }
        }
    });

    require(["sammy", "jquery", "AuthController", "ViewsController", "LogoutController", "Extensions", "Init"],
        function(Sammy, $, AuthController, ViewsController, LogoutController) {

        var API_URL = "http://localhost:11971/",
            //API_URL = "http://testing-64.apphb.com/",
            viewsController = new ViewsController("#main", API_URL),
            app;

        viewsController.loadHeader();

        // Routing
        app = new Sammy("#main", function() {
            this.get("#/", function() {
                viewsController.loadIndex();
            });

            this.get("#/sign-in", function() {
                viewsController.loadSignIn();
            });

            this.get("#/sign-up", function() {
                viewsController.loadSignUp();
            });

            this.get("#/search/:sparams/:page", function() {
                viewsController.loadSearchResults(this.params.sparams, this.params.page);
            });

            // [!]
            this.get("#/snippets/:lang/:page", function() {
                viewsController.userIndex(this.params.lang, this.params.page);
            });

            this.get("#/add-snippet", function() {
                viewsController.addSnippet();
            });

            this.get("#/modify-snippet/:id", function() {
                viewsController.modifySnippet(this.params.id);
            });

            this.get("#/profile", function() {
                viewsController.loadProfileSettings();
            });

            this.get("#/profile/security", function() {
                viewsController.loadSecuritySettings();
            });

            this.get("#/user/:guid", function() {
                // TODO: Implement
            });

            this.get("#/snippet/:id", function() {
                viewsController.loadSnippet(this.params.id);
            });

            this.get("#/logout", function() {
                var controller = new LogoutController(API_URL);
                AuthController.removeAuth();
                viewsController.loadHeader();
                viewsController.home();
            });
        });

        app.run("#/");
    });
}());