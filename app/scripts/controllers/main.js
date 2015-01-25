'use strict';

/**
 * @ngdoc function
 * @name bfrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bfrontApp
 */
angular.module('bfrontApp')
  .controller('MainCtrl', function ($scope, boardService) {
    
    var self = this;

    var container = $("#map-canvas");
    boardService.getBoards(function(boardsFromService) {
      $scope.boards = boardsFromService;


      angular.forEach($scope.boards, function(board) {
        
        var mapForNewMarker = board.mapPosition.zoom <= self.map.getZoom() ? self.map : null;
          var newMarker = new google.maps.Marker({
            position: new google.maps.LatLng(board.mapPosition.lat, board.mapPosition.lng),
            map: mapForNewMarker
          });

          google.maps.event.addListener(newMarker, 'click', function() {

              var infowindow = new google.maps.InfoWindow({
                  content: "<div><div>Additional description: " + board.additionalDescription + "</div><div>Цена: " + board.price + "</div><div><a href='#/boards/" + board.id + "'>Подробнее</a></div></div>"
              });
              infowindow.open(self.map, newMarker)
          });

          google.maps.event.addListener(self.map, 'zoom_changed', function() {
            if (board.mapPosition.zoom <= self.map.getZoom()) {
                newMarker.setMap(self.map);
            } else {
                newMarker.setMap(null);
            }
          });
      });
    })

    var options = {
      center: new google.maps.LatLng(53.9, 27.5666667),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    self.map = new google.maps.Map(container[0], options);
  });
