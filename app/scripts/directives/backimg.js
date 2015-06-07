'use strict';

/**
 * @ngdoc directive
 * @name bfrontApp.directive:backImg
 * @description
 * # backImg
 */
angular.module('bfrontApp')
  .directive('backImg', function (appConf) {
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            console.log("valuevalue " + value);
            if (!_.isNull(value) && !_.isEmpty(value)) {

                element.css({
                    'background-image': 'url(' + appConf.admBaseUrl + value +')',
                    'background-size' : 'cover'
                });
            } else {

                element.css({
                    'background-image': 'url("http://dummyimage.com/200x200/CCC/333&text=Not Found")',
                    'background-size' : 'cover'
                });
            }
        });
    };
  });
