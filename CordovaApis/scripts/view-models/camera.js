/* global kendo, window */

var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    'use strict';
    /*  function addPhotos() {
        var onPhotoSuccess = function(data) {
            photoUri = data;
            console.dir(data);
        };
            
        var onPhotoError = function(error) {
            navigator.notification.alert("Sorry, but we could not take the photo!");
            navigator.notification.alert(JSON.stringify(error));
        };
            
        var config = {
            destinationType: Camera.DestinationType.DATA_URL,//navigator.camera.DestinationType.FILE_URI,
            targetHeight: 400,
            targetWidth: 400
        };

        navigator.camera.getPicture(onPhotoSuccess, onPhotoError, config);
    }*/

    /* scope.camera = function (e) {
        var vm = kendo.observable({
                                      title: 'Camera',
                                      addPhoto: addPhotos()
                                  });
        
        kendo.bind(e.view.element, vm)
    }; */

    scope.camera = kendo.observable({
        title: 'Contacts',
        addPhoto: function () {
            var onPhotoSuccess = function (data) {
                console.dir(data);
               // photoUri = data.Uri;
               // console.dir(photoUri);
            };

            var onPhotoError = function (error) {
                navigator.notification.alert("Sorry, but we could not take the photo!");
            };

            var config = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URL, //navigator.camera.DestinationType.FILE_URI,
                targetHeight: 400,
                targetWidth: 400,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
            };

            navigator.camera.getPicture(onPhotoSuccess, onPhotoError, config);
        }
    });
}(app.viewmodels));

/* global window, kendo 

var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
	'use strict';
    
	scope.camera = function (e) {
		var vm = kendo.observable({
			title: 'Camera'
		});
		kendo.bind(e.view.element, vm)
	};
}(app.viewmodels));*/