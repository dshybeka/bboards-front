angular.module('bfrontApp')
  .controller('BoardDetailsCtrl', function ($scope, $routeParams, boardService) {

    var self = this;
    $scope.data = {
      eventSources : []
    };
    $scope.eventSources = [$scope.data.eventSources];

    var boardId = $routeParams.id;

    console.log("boardId " + boardId);

    boardService.getBoardById(boardId, function(board) {
      $scope.data.board = board;
      createCalendar();
      enrichEventsFromTimetables();
    });


    var createCalendar = function() {

      $scope.calendar = {
        height: 450,
        editable: false,
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
      };
    }

    var enrichEventsFromTimetables = function() {

      angular.forEach($scope.data.board.timetables, function(timetable) {

        var event = {
          title: 'Арендовано',
          start: timetable.startDate,
          end: timetable.endDate,
          overlap: false,
          color: 'red',
          editable: false
        };
        console.info(event);
        $scope.data.eventSources.push(event);
      });
    }

  });
