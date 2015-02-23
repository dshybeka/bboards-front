'use strict';

/**
 * @ngdoc function
 * @name bfrontApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the bfrontApp
 */
angular.module('bfrontApp')
  .controller('RegistrationCtrl', function ($scope, $location) {

    $scope.errorMessage = "";

    $scope.register = function() {
      $scope.errorMessage = "Horay!";      
    };

    $scope.cancel = function() {
      $location.path("/");
    };

  });
