'use strict';

/**
 * @ngdoc function
 * @name bfrontApp.controller:FullregistrationCtrl
 * @description
 * # FullregistrationCtrl
 * Controller of the bfrontApp
 */
angular.module('bfrontApp')
  .controller('FullregistrationCtrl', function ($scope, $location, userService) {
    
    $scope.errorMessage = "";
    $scope.regData = {};

    var userName = localStorage["username"];
    userService.getCurrentUser(userName, function(user) {
      $scope.regData  = user.userDetails;
    });

    $scope.fullregister = function() {
      console.log("full register is called " + $scope.regData.legalName);

      userService.updateFullRegistration($scope.regData, function(data) {
        console.log("finished updated full registration!");
        $location.path("/userhome");
      })
    };

    $scope.cancel = function() {
      $location.path("/userhome");
    };
  });
