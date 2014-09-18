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
            "FakeDataModel": "models/fake-data-model",
            "Extensions": "helpers/extensions",
            "HandlebarsHelper": "helpers/handlebars-helper",
            "AuthController": "controllers/auth-controller",
            "ViewsController": "controllers/views-controller",
            "SearchController": "controllers/search-controller",
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

    require(["sammy", "jquery", "AuthController", "ViewsController", "Extensions", "Init"],
        function(Sammy, $, AuthController, ViewsController) {

        var viewsController = new ViewsController("#main"),
            app;

        // >> Faking login

//        AuthController.setAuth({
//            name: "Pesho_le",
//            sessionKey: "132rjfauraea232dw",
//            avatar: "img/def_avatar.png"
//        });

        //AuthController.removeAuth();

        // Faking login END

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

            this.get("#/search/:sparams", function() {
                viewsController.loadSearchResults(this.params.sparams);
            });

            this.get("#/add-snippet", function() {
                // TODO: Implement
            });

            this.get("#/modify-snippet/:guid", function() {
                // TODO: Implement
            });

            this.get("#/profile/security", function() {
                // TODO: Implement
            });

            this.get("#/user/:guid", function() {
                // TODO: Implement
            });

            this.get("#/snippet/:guid", function() {
                // TODO: Implement
            });
        });

        app.run("#/");
    });
}());