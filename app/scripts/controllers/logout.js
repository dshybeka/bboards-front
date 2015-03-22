'use strict';

/**
 * @ngdoc function
 * @name bfrontApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the bfrontApp
 */
 // TODO: this controllers seems not in use, should be removed
angular.module('bfrontApp')
  .controller('LogoutCtrl', function ($rootScope, $scope, appConf, $http, authService, $location, $localStorage) {

      var self = this;
      self.appConf =appConf;

      console.log('logoutController called');

      $scope.logOut = function() {

console.log("logout");
          $http.post(self.appConf.serviceBaseUrl + "/rest/logout", {}, getHttpConfig()).
              success(function() {
                  console.log('logout success');
                  $localStorage.curUser = undefined;
                  console.log("cur user now " + $localStorage.curUser);
                  localStorage.clear();
                  $location.path("/")
              }).
              error(function(data) {
                  console.log('logout error: ' + data);
              });
      }
});
