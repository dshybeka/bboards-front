'use strict';

angular.module('bfrontApp')
.controller('NewMainCtrl', function($scope, $filter, boardService, $rootScope, $location) {

  $rootScope.$on('$routeChangeStart', function(event, next, current) {

// $rootScope.$broadcast('event:auth-loginRequired', {});
    // var nextUrl
    if (next.access != undefined && !next.access.allowAnonymous && localStorage["authToken"] === undefined) {
        console.log("originalPath2 " + $location.url());
        localStorage["urlToShowAfterLogin"] = $location.url();
        $location.path("/login");

        // $location.path(next.originalPath).search(next.pathParams);;
    }
  });

  $rootScope.$on('event:auth-loginRequired', function(event, next, current) {

    console.log("catched event!!");
    // var nextUrl
    // if (next.access != undefined && !next.access.allowAnonymous && localStorage["authToken"] === undefined) {
        console.log("originalPath2 " + $location.url());
        if ($location.url() === "/login") {
          localStorage["urlToShowAfterLogin"] = "/";
        } else {
          localStorage["urlToShowAfterLogin"] = $location.url();
        }
        $location.path("/login");

        // $location.path(next.originalPath).search(next.pathParams);;
    // }
  });

    var filterMarkersZoom = function(markers, zoom){
        angular.forEach(markers, function(marker) {
            marker.display = marker.board.mapPosition.zoom <= zoom ? true : false;
        });
    };

    $scope.zoom = 11;
    $scope.unfilteredMarkers = [];
    $scope.markers = [];
    $scope.map = {
        center: { latitude: 53.9, longitude: 27.56 },
        zoom: $scope.zoom,
        events: {
            zoom_changed: function(map, eventName, originalEventArgs) {
                $scope.zoom = map.zoom;
                filterMarkersZoom($scope.markers, map.zoom);
            }
        }
    };

    boardService.getBoards(function(boardsFromService) {

        angular.forEach(boardsFromService, function(board) {

            if (board.mapPosition != null && board.mapPosition != undefined) {
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
                $scope.unfilteredMarkers.push(marker);
            }
            
        });
        $scope.markers = $scope.unfilteredMarkers;
    });

    $scope.surfaceTypes = [
        {label: "Не важно", value: "Unknown"},
        {label: "Ткань", value: "Cloth"},
        {label: "Бумага", value: "Paper"}
    ];
    $scope.filterData = {
        filterSurfaceType : $scope.surfaceTypes[0],
        isSurfaceTypeExists : function() {
            return $scope.filterData.filterSurfaceType.value !== "Unknown";
        },
        checkSurfaceType : function(boardSurfaceName) {
            return boardSurfaceName.toLowerCase() === $scope.filterData.filterSurfaceType.value.toLowerCase();
        },

        filterAddress : "",
        isAddressExists : function() {
            return !_.isEmpty($scope.filterData.filterAddress);
        },
        checkAddress : function(boardAddress) {
            
            var result = false;

            var isBoardAddressExsits = boardAddress != null && boardAddress != undefined;
            if (isBoardAddressExsits) {
                result = $scope.filterData.isAddressExists()&& boardAddress.fullAddress.indexOf($scope.filterData.filterAddress) != -1;
            }
            return result;
        },

        filterDistinct : "",
        isDistinctExists : function() {
            return !_.isEmpty($scope.filterData.filterDistinct);
        },
        checkDistinct : function(boardAddress) {

            var result = false;

            var isBoardDistinctExsits = boardAddress != null && boardAddress != undefined;
            if (isBoardDistinctExsits) {
                result = $scope.filterData.isDistinctExists() && boardAddress.district.indexOf($scope.filterData.filterDistinct) != -1;
            }
            return result;  
        },

        filterPlaces : "",
        isPlacesExists : function() {
            return !_.isEmpty($scope.filterData.filterPlaces);  
        },
        checkPlaces : function(places) {

            var isPlacesExsits = !_.isEmpty(places);
            console.log("isPlacesExsits " + isPlacesExsits);
            if (isPlacesExsits) {
                console.log("isPlacesExsits " + isPlacesExsits + " fpr places");
                var placesArray = places.split(",");
                var placesInput = $scope.filterData.filterPlaces.toLowerCase().split(", ");
                for (var i = 0; i < placesArray.length; ++i) {
                    console.log("check " + placesArray[i].trim() + " in " + placesInput + " result " + _.contains(placesInput, placesArray[i].trim()));
                    if (_.contains(placesInput, placesArray[i].trim())) {
                        console.log("return for placesInput " + placesInput);
                        return true;
                    }
                }
            }
        },

        filterPriceFrom : "",
        isPriceFromExists : function() {
            return $scope.filterData.filterPriceFrom != null && $scope.filterData.filterPriceFrom != undefined;  
        },
        checkPriceFrom : function(price) {
            var isPriceExists = price != undefined && price != null;

            return isPriceExists && Number(price) >= Number($scope.filterData.filterPriceFrom);
        },

        filterPriceTo : "",
        isPriceToExists : function() {
            return $scope.filterData.filterPriceTo != null && $scope.filterData.filterPriceTo != undefined;  
        },
        checkPriceTo : function(price) {
            var isPriceExists = price != undefined && price != null;
            return isPriceExists && Number(price) <= Number($scope.filterData.filterPriceTo);
        },

        isPriceRangeExists : function() {
            return $scope.filterData.isPriceToExists() || $scope.filterData.isPriceFromExists();
        },
        checkPriceRange : function(price) {
            var result = true;
            if ($scope.filterData.isPriceToExists()) {
                result = result && $scope.filterData.checkPriceTo(price);
            }
            if ($scope.filterData.isPriceFromExists()) {
                result = result && $scope.filterData.checkPriceFrom(price);    
            }
            console.log("end: price " + price);

            return result;
        },

        isExists : function() {
            return $scope.filterData.isSurfaceTypeExists() ||
                   $scope.filterData.isAddressExists() ||
                   $scope.filterData.isDistinctExists() || 
                   $scope.filterData.isPlacesExists() || 
                   $scope.filterData.isPriceFromExists() || 
                   $scope.filterData.isPriceToExists();
        }
    };

    // TODO: move to filter service
    $scope.filterBySelectValues = function() {

        console.log("$scope.filterData.isExists() " + $scope.filterData.isExists());
        if ($scope.filterData.isExists()) {
            $scope.markers = _.filter($scope.unfilteredMarkers, function(marker) {
                var markerBoard = marker.board;
                var filterResult = $scope.filterData.checkSurfaceType(markerBoard.surfaceName) ||
                       $scope.filterData.checkAddress(markerBoard.address) ||
                       $scope.filterData.checkDistinct(markerBoard.address) ||
                       $scope.filterData.checkPlaces(markerBoard.entertainmentCenters) ||
                       $scope.filterData.checkPriceRange(markerBoard.price);

                return filterResult;
            });
        } else {
            $scope.markers = $scope.unfilteredMarkers;
        }
    }

});
