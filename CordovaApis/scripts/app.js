
(function () {
    var app;
   // var photoUri = '';
 /*   window.APP = {
      models: {
        home: {
          title: 'Home'
        },
        settings: {
          title: 'Settings'
        },
        contacts: {
          title: 'Contacts',
          ds: new kendo.data.DataSource({
            data: [{ id: 1, name: 'Bob' }, { id: 2, name: 'Mary' }, { id: 3, name: 'John' }]
          }),
          alert: function(e) {
            alert(e.data.name);
          }
        }
      }
    }; */

    document.addEventListener('deviceready', function () {  
      navigator.splashscreen.hide();

      app = new kendo.mobile.Application(document.body, {
        transition: 'slide',
        skin: 'flat',
        initial: 'views/camera.html'
      });

    }, false);
}()); 

/* global document, navigator, kendo, window 

(function () {
	'use strict';

	document.addEventListener('deviceready', function () {
		window.todos = [{
			title: 'Initial',
			isUrgent: true
		}];
		navigator.splashscreen.hide();
		new kendo.mobile.Application(document.body, {
			transition: 'slide'
		});
	}, false);
}());*/