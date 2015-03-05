angular.module('bfrontApp')
  .controller('BoardDetailsCtrl', function ($scope, $routeParams, boardService) {

    var self = this;
    $scope.data = {
      eventSources : []
    };

    var boardId = $routeParams.id;

    console.log("boardId " + boardId);

    boardService.getBoardById(boardId, function(board) {

      $scope.data.board = board;
    });

    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        editable: true,
        header:{
          right: 'today prev,next'
        },
        buttonText: {
          'today': 'Сегодня'
        },
        dayNames: ["Понедельник","Вторник","Суббота","Четверг","Пятница","Суббота","Воскресенье"],
        dayNamesShort: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        monthNames: ["Январь", "Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
        monthNamesShort: ["Янв", "Фев","Март","Апр","Май","Июнь","Июль","Авг","Сент","Окт","Нояб","Дек"]
      }
    };

    angular.forEach($scope.data.board.timetables, function(timetable) {

      var event = {
        title: 'Арендован',
        start: timetable.startDate,
        end: timetable.endDate,
        overlap: false,
        color: 'red',
        editable: false
      };

      $scope.data.eventSources.push(event);
    });

    $scope.eventSources = [$scope.data.eventSources];

  });
