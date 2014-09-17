define(["jquery"], function($) {
    "use strict";

    var UiController;
    UiController = (function() {
        var $searchInfoHolder = $("#search-info-holder"),
            $searchFieldForm = $("#search-field-form");

        function UiController() {}

        UiController.setSearchInfoToggle = function() {
            $("#main-header").find(".search-info").on("click", function() {
                $searchInfoHolder.fadeIn();
                
                return false;
            });
        };

        UiController.setSearchAction = function() {
            $searchFieldForm.find("button").on("click", function() {
                var searchParams = $searchFieldForm.find(".search-field").val();
                $searchFieldForm.attr("action", "#/search/" + searchParams);
            });
        };

        UiController.clearPopUps = function() {
            $(document).on("click", function() {
                $searchInfoHolder.fadeOut();
            });
        };

        return UiController;
    }());

    return UiController;
});