angular.module('bfrontApp')
  .controller('BoardDetailsCtrl', function ($scope, $routeParams, boardService) {
    
    var self = this;
    $scope.data = {};

    var boardId = $routeParams.id;

    console.log("boardId " + boardId);

    boardService.getBoardById(boardId, function(board) {
      $scope.data.board = board;
      console.log("$scope.board " + board.price);
          $scope.data.tt = "smthaaa";
    });
    $scope.ad = "ggorten";

  });