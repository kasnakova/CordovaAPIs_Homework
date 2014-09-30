define(["jquery", "SnippetsModel"], function($, SnippetsModel) {
    "use strict";

    var SnippetsController;
    SnippetsController = (function() {
        function SnippetsController(apiUrl) {
            this.snippetsModel = new SnippetsModel(apiUrl);
        }

        SnippetsController.prototype.bindOnSnippetAdd = function() {
            var self = this;

            $(document).on("submit", "#add-snippet", function() {
                var $this = $(this),
                    data = {
                        title: $this.find(".title").val(),
                        language: $this.find(".language").val(),
                        content: $this.find(".code-input").val()
                    };

                self.snippetsModel.postSnippet(data).then(
                    function() {
                        console.log("Great success!");
                    },
                    function() {

                    }
                );
            });
        };

        SnippetsController.prototype.bindOnSnippetModification = function(id) {
            var self = this;

            $(document).on("submit", "#modify-snippet", function() {
                var $this = $(this),
                    data = {
                        title: $this.find(".title").val(),
                        language: $this.find(".language").val(),
                        content: $this.find(".code-input").val()
                    };

                self.snippetsModel.modifySnippet(id, data).then(
                    function() {
                        console.log("Great success!");
                    },
                    function() {

                    }
                );
            });
        };

        return SnippetsController;
    }());

    return SnippetsController;
});