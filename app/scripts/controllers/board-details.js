angular.module('bfrontApp')
  .controller('BoardDetailsCtrl', function ($scope, $routeParams, $http, $timeout, appConf, boardService) {

    var self = this;
    $scope.data = {
      eventSources : []
    };
    $scope.format = 'dd.MM.yyyy'
    $scope.eventSources = [$scope.data.eventSources];

    $scope.startDate;
    $scope.endDate;

    $scope.opened = false;
    $scope.openedSecond = false;

    $scope.boardOrderError;

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
        console.info("PUSH EVENT");
      });

    }


    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
      $scope.maxDate = '2015-12-31';
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.openEnd = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.openedSecond = true;
    };

    $scope.dateOptions = {
      formatYear: 'yyyy',
      startingDay: '1',
      maxMode: 'day'
    };


    $scope.orderBoard = function() {
      alert("Order board " + boardId + " from " + $scope.startDate + " to " + $scope.endDate + " by " + localStorage["username"]);

      $http.post( appConf.serviceBaseUrl + "/rest/order/add")
        .success(function(data) {

          console.log('Order created');


        }).
        error(function(data) {
          console.log('Error while order creating');
          $scope.boardOrderError = 'Error while order creating. ' + data;
          $timeout(function(){
            $scope.boardOrderError = null
          }, 5000);
        });
    }

  });
