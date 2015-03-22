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

      var curUser = {};

      curUser.email = user.email;
      curUser.fio = user.fio;
      curUser.phone = user.phone;
      curUser.username = user.username;
      curUser.userDetails = user.userDetails;

      $scope.data.user = curUser;
    });
    

  });
