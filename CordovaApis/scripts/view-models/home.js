/* global window, kendo */

var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
	'use strict';
    
	scope.home = function (e) {
		var vm = kendo.observable({
			title: 'Home'
		});
		kendo.bind(e.view.element, vm)
	};
}(app.viewmodels));