define(["UiController"], function(UiController) {
    "use strict";

    /*
     * Initialises static content
     */
    UiController.setSearchInfoToggle();
    UiController.clearPopUps();
    UiController.setSearchAction();
    UiController.enableTextareaTab();
    UiController.loadingSpinner();
    UiController.confirmDeleteMessage();
});