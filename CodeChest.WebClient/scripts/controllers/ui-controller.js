define(["jquery"], function($) {
    "use strict";

    var UiController;
    UiController = (function() {
        var $searchInfoHolder = $("#search-info-holder"),
            $searchFieldForm = $("#search-field-form"),
            $mainSection = $("section#main");

        function UiController() {}

        UiController.setSearchInfoToggle = function() {
            $("#main-header").find(".search-info").on("click", function() {
                $searchInfoHolder.fadeIn();
                
                return false;
            });
        };

        UiController.setSearchAction = function() {
            $searchFieldForm.find("button").on("click", function() {
                var searchParams = $searchFieldForm.find(".search-field").val().trim().replaceAllOccurrences("/", "");

                if (searchParams) {
                    $searchFieldForm.attr("action", "#/search/" + searchParams + "/1");
                }
            });
        };

        UiController.clearPopUps = function() {
            $(document).on("click", function() {
                $searchInfoHolder.fadeOut();
            });
        };

        UiController.enableTextareaTab = function() {
            $mainSection.on("keydown", "textarea.code-input", function(e) {
                var keyCode = e.keyCode || e.which,
                    $this = $(this),
                    start,
                    val,
                    end;

                if (keyCode === 9) {
                    e.preventDefault();

                    val = $this.val();
                    start = $this[0].selectionStart;
                    end = $this[0].selectionEnd;

                    $this.val(val.substring(0, start) + '\t' + val.substring(end));

                    $this[0].selectionStart = $this[0].selectionEnd = start + 1;

                    return false;
                }
            });
        };

        UiController.loadingSpinner = function() {
            var $loading = $("#loading-spinner");

            $(document)
                .ajaxStart(function () {
                    $loading.show();
                })
                .ajaxStop(function () {
                    $loading.hide();
                });
        };

        UiController.confirmDeleteMessage = function() {
            $(document).on("click", ".delete-me", function() {
                var $this = $(this),
                    $parent = $this.parent().parent(),
                    $deleteMsg = $parent.find(".confirm-del-msg"),
                    $abortDelete = $parent.find(".abort-delete");

                $deleteMsg.fadeIn();

                $abortDelete.click(function() {
                    $deleteMsg.fadeOut();
                });
            });
        };

        return UiController;
    }());

    return UiController;
});