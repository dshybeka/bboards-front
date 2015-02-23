'use strict';

/**
 * @ngdoc directive
 * @name bfrontApp.directive:login
 * @description
 * # login
 */
angular.module('bfrontApp')
  .directive('login', function () {
    return {
      templateUrl: '/views/login.html',
      restrict: 'E',
      replace: true
    };
  });
