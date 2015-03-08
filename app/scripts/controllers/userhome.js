'use strict';

/**
 * @ngdoc function
 * @name bfrontApp.controller:UserhomeCtrl
 * @description
 * # UserhomeCtrl
 * Controller of the bfrontApp
 */
angular.module('bfrontApp')
  .controller('UserhomeCtrl', function ($scope, userService) {
    
    $scope.data = {user: {}};

    var userName = localStorage["username"];
    userService.getCurrentUser(userName, function(user) {
      $scope.data.user.email = user.email;
      $scope.data.user.fio = user.fio;
      $scope.data.user.phone = user.phone;
      $scope.data.user.username = user.username;
    });

  });
