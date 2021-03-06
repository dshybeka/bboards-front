'use strict';

/**
 * @ngdoc function
 * @name bfrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bfrontApp
 */
angular.module('bfrontApp')
  .controller('MainCtrl', function ($scope, appConf, boardService, $rootScope, $location) {



console.log("spnner: " + $rootScope.spinner.active);

    var self = this;
    self.appConf = appConf;
    console.log("self.appConf " + self.appConf.admBaseUrl);

    var adminLink = self.appConf.admBaseUrl;
    var container = $("#map-canvas");

    boardService.getBoards(function(boardsFromService) {

      $scope.boards = boardsFromService;

      angular.forEach($scope.boards, function(board) {

        var isMapPostitionExists = board.mapPosition !== null;
        if (isMapPostitionExists) {
          var mapForNewMarker = isMapPostitionExists && board.mapPosition.zoom <= self.map.getZoom() ? self.map : null;
            var newMarker = new google.maps.Marker({
              position: new google.maps.LatLng(board.mapPosition.lat, board.mapPosition.lng),
              map: mapForNewMarker
            });

            google.maps.event.addListener(newMarker, 'click', function() {

                var infowindow = new google.maps.InfoWindow({
                    content: "<div>" + getBoardImage(board.dayPhoto) + getBoardImage(board.nightPhoto) +
                    "<div>Описание: " + board.additionalDescription + "</div><div>Цена: " + board.price +
                    "</div><div><a href='#/boards/" + board.id + "'>Подробнее</a></div></div>"
                });
                infowindow.open(self.map, newMarker)
            });

            google.maps.event.addListener(self.map, 'zoom_changed', function() {
              if (board.mapPosition !== undefined && board.mapPosition !== null) {
                if (board.mapPosition.zoom <= self.map.getZoom()) {
                    newMarker.setMap(self.map);
                } else {
                    newMarker.setMap(null);
                }
              }
            });
        }
      });
    });

    var options = {
      center: new google.maps.LatLng(53.9, 27.5666667),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var getBoardImage = function(image) {
        return image != null ? "<img src='" + adminLink + image.url + "' height='50' width='50' />" : "<img src='http://dummyimage.com/800x600/292929/e3e3e3&text=Not found' height='50' width='50' />";
    };

    self.map = new google.maps.Map(container[0], options);
  });
