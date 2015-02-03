'use strict';

/**
 * @ngdoc function
 * @name bfrontApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the bfrontApp
 */
angular.module('bfrontApp')
  .controller('LogoutCtrl', function ($rootScope, $scope, appConf, $http, authService) {

      var self = this;
      self.appConf =appConf;

      console.log('logoutController called');

      $scope.logOut = function() {
          console.log('logOut called');

          $http.post(self.appConf.serviceBaseUrl + "/rest/logout", {}, getHttpConfig()).
              success(function() {
                  console.log('logout success');
                  localStorage.clear();
                  $location.path("/")
              }).
              error(function(data) {
                  console.log('logout error: ' + data);
              });
      }
});
