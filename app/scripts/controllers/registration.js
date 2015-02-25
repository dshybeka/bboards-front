'use strict';

/**
 * @ngdoc function
 * @name bfrontApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the bfrontApp
 */
angular.module('bfrontApp')
  .controller('RegistrationCtrl', function ($scope, $location, userService) {

    $scope.regData = {};

    $scope.errorMessage = "";
    $scope.successMessage = "";

    $scope.register = function() {
      userService.registration($scope.regData, function(data) {
        if (data.success === undefined || data.success === false) {
          $scope.errorMessage = "Ошибка во время регистрации";
        } else {
          if (data.model !== null) {
            $location.path("/login");
          }
        }
        console.log("callback is called");
      });
      $scope.clean();
    };

    $scope.cancel = function() {
      $scope.clean();
      $location.path("/");
    };

    $scope.clean = function() {

      $scope.regData.fio = "";
      $scope.regData.email = "";
      $scope.regData.phone = "";
      $scope.regData.password = "";
      $scope.regData.passwordConfirmation = "";
    };

    $scope.clean();
  });
