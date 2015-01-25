'use strict';

/**
 * @ngdoc overview
 * @name bfrontApp
 * @description
 * # bfrontApp
 *
 * Main module of the application.
 */
angular
  .module('bfrontApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/boards/:id', {
        templateUrl: 'views/board-details.html',
        controller: 'BoardDetailsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
