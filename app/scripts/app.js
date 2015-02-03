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
    'ngTouch',
    'http-auth-interceptor'
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

// TODO: maybe we should move out this functions
function getLocalToken() {
   return 'Bearer ' + localStorage["authToken"];
}

function setLocalToken(value) {
    localStorage["authToken"] = value;
}

function getHttpConfig() {
    return {
        headers: { //Authorization: Bearer
            'Authorization': getLocalToken()
        }
    };
}

function getAuthenticateHttpConfig() {
    return {
        ignoreAuthModule: true
    };
}
