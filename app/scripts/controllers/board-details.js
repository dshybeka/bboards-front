angular.module('bfrontApp')
  .controller('BoardDetailsCtrl', function ($scope, $routeParams, $http, $timeout, appConf, boardService, orderService) {

    var self = this;

    var boardId = $routeParams.id;

    $scope.data = {
      orders : [],
      eventSources : []
    };
    $scope.format = 'dd.MM.yyyy'
    $scope.eventSources = [$scope.data.eventSources];

    $scope.startDate = null;
    $scope.endDate = null;

    $scope.opened = false;
    $scope.openedSecond = false;

    $scope.message = null;

    $scope.zoom = 11;
    $scope.map = {
        center: { latitude: 53.9, longitude: 27.56 },
        zoom: $scope.zoom
    };
    $scope.curMarkers = [];

    console.log("boardId " + boardId);

    boardService.getBoardById(boardId, function(board) {
      $scope.data.board = board;
      var marker = {
          id: board.id,
          coords: {
              latitude: board.mapPosition.lat,
              longitude: board.mapPosition.lng
          },
          board: board,
          display: true,
          windowOptions: {
              visible: false
          }
      };
      $scope.curMarkers.push(marker);

      createCalendar();
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
        monthNamesShort: ["Янв", "Фев","Март","Апр","Май","Июнь","Июль","Авг","Сент","Окт","Нбр","Дек"]
      };
    }

    var getOrders = function() {

      orderService.getOrdersByBoardId(boardId, function(orders) {

        angular.forEach(orders, function(timetable) {

          var event = {
            title: 'Арендовано',
            start: timetable.startDate,
            end: timetable.endDate,
            overlap: false,
            color: 'red',
            editable: false
          };

          $scope.data.eventSources.push(event);
        });

      });
    };

    $scope.data.orders = getOrders();

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

      if ($scope.startDate ==  null) {
        $scope.message = {
          text : "Введите начальную дату аренды",
          type : 'alert-danger'
          }
        return;
      }
      if ($scope.endDate == null) {
        $scope.message = {
          text : "Введите конечную дату аренды",
          type : 'alert-danger'
        }
        return;
      }

      $scope.message = orderService.saveOrder({
        startDate:  $scope.startDate.toLocaleDateString(),
        endDate: $scope.endDate.toLocaleDateString(),
        boardId: $routeParams.id,
        customer: localStorage["username"],
        orderType: "ON_APPROVE"
      });

    }

  });
