'use strict';
angular.module('bfrontApp').service('boardService', function($http, $rootScope, appConf){


  this.getBoards = function(callback) {
    var self = this;

    console.log("retrieve all boards ");

    $rootScope.spinner.active = true;
    $http.get(appConf.serviceBaseUrl + appConf.restUrls.boards)
        .success(function(data) {

            if (data.success === true) {

                var boards = data.model;
                console.log("boards retrieved");
                self.board = boards;
            } else {
                console.log("error while retrieving boards");
            }

            callback(boards);
        }).error(function() {
            console.log("fail while retrieving boards");
        }).finally(function() {
            $rootScope.spinner.active = false;
        });
  };

  this.getBoardById = function(id, callback) {
    var self = this;

    console.log("retireve board by id");

    $rootScope.spinner.active = true;
    $http.get(appConf.serviceBaseUrl + appConf.restUrls.boards + '/' + id, getHttpConfig())
        .success  (function(data) {

            if (data.success === true) {

                var board = data.model;
                console.log("boards retrieved");
                self.board = board;
            } else {
                console.log("error while retrieving board");
            }

            callback(board);
        }).error(function() {
            console.log("fail while retrieving board");
        }).finally(function() {
            $rootScope.spinner.active = false;
        });
  };

});
