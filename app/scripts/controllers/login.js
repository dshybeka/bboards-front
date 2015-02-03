'use strict';

/**
 * @ngdoc function
 * @name bfrontApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bfrontApp
 */
angular.module('bfrontApp')
  .controller('LoginCtrl', function ($rootScope, $scope, appConf, $http, authService) {
    
    var self = this;
    self.appConf =appConf;

    // $scope.loginForm.$setPristine();
    $scope.authData = {};
    $scope.authData.username = "";
    $scope.authData.password = "";

    $scope.logIn = function() {

      console.log("Login controller is called");

      $http.post(
      
          self.appConf.serviceBaseUrl + "/rest/login",
          { username: $scope.authData.username, password: $scope.authData.password }, getAuthenticateHttpConfig())

        .success(function(data) {
      
          console.log('authentication token: ' + data.access_token);
  
          localStorage["authToken"] = data.access_token;
          authService.loginConfirmed({}, function(config) {
              if(!config.headers["Authorization"]) {
                  console.log('Authorization not on original request; adding it');
                  config.headers["Authorization"] = getLocalToken();
              }
              return config;
          });
      }).
        error(function(data) {
            console.log('login error: ' + data);
            $rootScope.$broadcast('event:auth-loginFailed', data);
        });
    }

  });
