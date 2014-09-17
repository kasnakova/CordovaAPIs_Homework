define(["jquery"], function($) {
    "use strict";

    var UiController;
    UiController = (function() {
        var $searchInfoHolder = $("#search-info-holder");

        function UiController() {}

        UiController.setSearchInfoToggle = function() {
            $("#main-header").find(".search-info").on("click", function() {
                $searchInfoHolder.fadeIn();
                
                return false;
            });
        };

        UiController.setSearchAction = function() {
            $("#search-field-form").find("button").on("click", function() {
                console.log("asdas");
                var searchParams = $(this).find(".search-field").val();
                $(this).attr("action", "#/search/" + searchParams);
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