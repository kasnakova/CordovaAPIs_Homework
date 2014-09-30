/* global window, kendo */

var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
	'use strict';

	function loadTodos() {
		return window.todos;
	}

	scope.todos = function (e) {
		var vm = kendo.observable({
			title: 'List TODOs',
			todos: loadTodos()
		});
		kendo.bind(e.view.element, vm)
	};
}(app.viewmodels));