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
            element.css({
                'background-image': 'url(' + appConf.admBaseUrl + value +')',
                'background-size' : 'cover'
            });
        });
    };
  });
