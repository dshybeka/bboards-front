'use strict';

angular.module('bfrontApp')
.controller('NewMainCtrl', function($scope, boardService) {

    var filterMarkers = function(markers, zoom){
        angular.forEach(markers, function(marker) {
            marker.display = marker.board.mapPosition.zoom <= zoom ? true : false;
        });
    };

    $scope.zoom = 11;
    $scope.markers = [];
    $scope.map = {
        center: { latitude: 53.9, longitude: 27.56 },
        zoom: $scope.zoom,
        events: {
            zoom_changed: function(map, eventName, originalEventArgs) {
                $scope.zoom = map.zoom;
                filterMarkers($scope.markers, map.zoom);
            }
        }
    };

    boardService.getBoards(function(boardsFromService) {

        angular.forEach(boardsFromService, function(board) {
            var visible =  board.mapPosition.zoom <= $scope.zoom ? true : false;
            var marker = {
                id: board.id,
                coords: {
                    latitude: board.mapPosition.lat,
                    longitude: board.mapPosition.lng
                },
                board: board,
                display: visible,
                windowOptions: {
                    visible: false
                },
                events: {
                    click: function(marker, eventName, args) {
                        this.show= true;
                    }
                },
                closeClick: function() {
                    this.windowOptions.visible = false;
                }
            };
            $scope.markers.push(marker);
        });
    });

});
