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
        controller: 'MainCtrl',
        access: {allowAnonymous: true}
      })
      .when('/boards/:id', {
        templateUrl: 'views/board-details.html',
        controller: 'BoardDetailsCtrl',
        access: {allowAnonymous: false}
      })
      .when('/registration', {
        templateUrl: 'views/registration.html',
        controller: 'RegistrationCtrl',
        access: {allowAnonymous: true}
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        access: {allowAnonymous: true}
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

function isAuth() {
  return localStorage["authToken"] != undefined;
};

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
