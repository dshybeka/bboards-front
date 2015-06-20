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
  .config(function ($routeProvider,  $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/new-main.html',
        controller: 'NewMainCtrl',
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

      
      console.log(" $httpProvider. " +  $httpProvider);

  });

angular.module('bfrontApp').run(run);

angular.module('bfrontApp').factory('authInterceptor', ['$q', '$rootScope', '$location', function($q, $rootScope, $location) {

  $rootScope.$on('$routeChangeStart', function(event, next, current) {

    console.log("Route changed!");

    // if (next.access != undefined && !next.access.allowAnonymous && localStorage["authToken"] === undefined) {
        console.log("originalPath2 " + $location.url());
        localStorage["urlToShowAfterLogin"] = $location.url();
        // $location.path("/login");

        // $location.path(next.originalPath).search(next.pathParams);;
    // }
  });

  $rootScope.$on('event:auth-loginRequired', function(event, next, current) {

    console.log("Login required!")
    $rootScope.spinner.active = false;
    // var nextUrl
    // if (next.access != undefined && !next.access.allowAnonymous && localStorage["authToken"] === undefined) {
        if ($location.url() === "/login") {
          console.log("On login page ")
          localStorage["urlToShowAfterLogin"] = "/";
        }
        $location.path("/login");

        // $location.path(next.originalPath).search(next.pathParams);;
    // }
  }); 

    var authInterceptor = {
        responseError: function(response) {
          console.log("response " + response);
          console.log("response status" + response.status);
          if(response.status === 401) {
            $rootScope.$broadcast('event:auth-loginRequired');
          }
            return $q.reject(response);
        }
    };

    return authInterceptor;
}]);
angular.module('bfrontApp').config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('authInterceptor');
}]);

run.$inject = ['$rootScope', '$http', 'appConf'];

function run ($rootScope, $http, appConf) {

  // $http.post(
      
  //         appConf.serviceBaseUrl + "/rest/validate",
  //         { }, getAuthenticateHttpConfig())

  //     .success(function(data) {

  //         console.log("Token is validated");

  //     }).
  //     error(function(data) {
  //         localStorage["username"] = undefined;
  //         localStorage["authToken"] =undefined;
  //         console.log('login error: ' + data);
  //     }).finally(function() {
  //       $rootScope.spinner.active = false;
  //     });

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



