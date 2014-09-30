/* global kendo, window */

var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
	'use strict';
	scope.addTodo = kendo.observable({
		title: '',
		isUrgent: false,
		saveTodo: function () {
			//backend serves
			window.todos.push({
				title: this.get('title'),
				isUrgent: this.get('isUrgent')
			});
		}
	});
}(app.viewmodels));