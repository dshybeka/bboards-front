angular.module('bfrontApp').service('boardService', function(){


  this.getBoards = function(callback) {
    var self = this;

    console.log("retrieve all boards");
      
    $.ajax({
        crossDomain: true,
        type: 'GET',
        // url: "http://bservice-bboards.rhcloud.com/bservice/rest/boards"
        url: "http://bservice-bboards.rhcloud.com/bservice/rest/boards"
    }).done(function(data) {

        if (data.success === true) {

            var boards = data.model;
            console.log("boards retrieved");
            self.board = boards;
        } else {
            console.log("error while retrieving boards");
        }

        callback(boards);
    }).fail(function() {
        console.log("fail while retrieving boards");
    });
  };

  this.getBoardById = function(id, callback) {
    var self = this;

    console.log("retireve board by id");
      
    $.ajax({
        crossDomain: true,
        type: 'GET',
        // url: "http://bservice-bboards.rhcloud.com/bservice/rest/boards"
        url: "http://bservice-bboards.rhcloud.com/bservice/rest/boards/" + id
    }).done(function(data) {

        if (data.success === true) {

            var board = data.model;
            console.log("boards retrieved");
            self.board = board;
        } else {
            console.log("error while retrieving board");
        }

        callback(board);
    }).fail(function() {
        console.log("fail while retrieving board");
    });
  };
  
});