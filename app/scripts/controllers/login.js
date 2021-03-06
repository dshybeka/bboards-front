'use strict';

/**
 * @ngdoc function
 * @name bfrontApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bfrontApp
 */
angular.module('bfrontApp')
  .controller('LoginCtrl', function ($rootScope, $scope, appConf, $http, authService, $location, $localStorage) {
    
    var self = this;
    self.appConf = appConf;

    // $scope.loginForm.$setPristine();
    $scope.authData = {};
    $scope.authData.username = "";
    $scope.authData.password = "";
    $scope.errorMessage = "";

    $scope.logIn = function() {


      $rootScope.spinner.active = true;
      $http.post(
      
          self.appConf.serviceBaseUrl + "/rest/login",
          { username: $scope.authData.username, password: $scope.authData.password }, getAuthenticateHttpConfig())

        .success(function(data) {

          localStorage["username"] = $scope.authData.username;
          localStorage["authToken"] = data.access_token;

          authService.loginConfirmed("success", function(config) {

              if(!config.headers["Authorization"] || config.headers["Authorization"].indexOf('undefined') !== -1) {
                  config.headers["Authorization"] = getLocalToken();
              }
              return config;
          });

          var nextPage = localStorage["urlToShowAfterLogin"] === undefined || localStorage["urlToShowAfterLogin"] === "/login" ?  "/" : localStorage["urlToShowAfterLogin"];
          $location.path(nextPage);

      }).
      error(function(data) {
          console.log('login error: ' + data);
          $rootScope.$broadcast('event:auth-loginFailed', data);
          $scope.errorMessage = "Неверное имя пользователя или пароль";
      }).finally(function() {
        $rootScope.spinner.active = false;
      });
    };

    $scope.showLogin = function() {
      $rootScope.$broadcast('event:auth-loginRequired');
    };

    $scope.logOut = function() {

        $http.post(self.appConf.serviceBaseUrl + "/rest/logout", {}, getHttpConfig()).
            success(function() {

                $localStorage.curUser = undefined;

                localStorage.clear();
                $location.path("/");

                authService.loginCancelled();
            }).
            error(function(data) {
                console.log('logout error: ' + data);
            });
    };

    $scope.isAuth = function() {
      return localStorage["authToken"] != undefined;
    };

    $scope.isNotAuth = function() {
      return !$scope.isAuth();
    };

    $scope.getUsername = function() {
      return localStorage["username"];
    };

  });
