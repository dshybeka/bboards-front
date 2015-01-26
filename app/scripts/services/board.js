angular.module('bfrontApp').service('boardService', function($http){


  this.getBoards = function(callback) {
    var self = this;

    console.log("retrieve all boards");
      
    $http.get('http://bservice-bboards.rhcloud.com/bservice/rest/boards')
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
    });
  };

  this.getBoardById = function(id, callback) {
    var self = this;

    console.log("retireve board by id");
      
    $http.get('http://bservice-bboards.rhcloud.com/bservice/rest/boards/' + id)
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
    });
  };
  
});