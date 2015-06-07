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
    'http-auth-interceptor',
    'ui.bootstrap',
    'uiGmapgoogle-maps',
    'ui.calendar',
    'ngStorage',
    'ngAnimate',
    'treasure-overlay-spinner',
    'leaflet-directive'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      // .when('/', {
      //   templateUrl: 'views/main.html',
      //   controller: 'MainCtrl',
      //   access: {allowAnonymous: true}
      // })
      .when('/', {
        templateUrl: 'views/new-main.html',
        controller: 'NewMainCtrl',
        access: {allowAnonymous: true}
      })
      // .when('/redesign', {
      //   templateUrl: 'views/new-main.html',
      //   controller: 'NewMainCtrl',
      //   access: {allowAnonymous: true}
      // })
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
      .when('/userhome', {
        templateUrl: 'views/userhome.html',
        controller: 'UserhomeCtrl',
        access: {allowAnonymous: false}
      })
      .when('/fullregistration', {
        templateUrl: 'views/fullregistration.html',
        controller: 'FullregistrationCtrl',
        access: {allowAnonymous: false}
      })
      .otherwise({
        redirectTo: '/'
      });
  });
angular.module('bfrontApp').run(run);
run.$inject = ['$rootScope'];
function run ($rootScope) {
  $rootScope.spinner = {
    active: false,
    on: function () {
      this.active = true;
    },
    off: function () {
      this.active = false;
    }
  };

}
    
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



