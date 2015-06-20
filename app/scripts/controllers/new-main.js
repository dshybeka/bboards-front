'use strict';

angular.module('bfrontApp')
.controller('NewMainCtrl', function($scope, $filter, boardService, $rootScope, $location, utilsService, appConf, leafletData) {

    $scope.minskCenter = appConf.minskCenter;
    var unfilteredMarkers = [];
    $scope.markers = [];

    $scope.layers = {baselayers: {
                        mapbox_light: {
                            name: 'Mapbox Light',
                            url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                            type: 'xyz',
                            layerOptions: {
                                apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
                                mapid: 'bufanuvols.lia22g09'
                            }
                        }
                    },
                    overlays: {
                        minskBoards: {
                            name: "Minsk Boards",
                            type: "markercluster",
                            visible: true
                        }
                    }};

    boardService.getBoards(function(boardsFromService) {

        angular.forEach(boardsFromService, function(board) {

            if (board.mapPosition != null && board.mapPosition != undefined) {
                var visible =  board.mapPosition.zoom <= $scope.zoom ? true : false;

                var marker = {
                    id: board.id,
                    lat: Number(board.mapPosition.lat),
                    lng: Number(board.mapPosition.lng),
                    board: board,
                    layer: 'minskBoards',
                    display: visible,
                    getMessageScope: function () { return board; },
                    message: "<div>" +
                                  "<div >Описание: " + utilsService.getStringOrEmpty(board.additionalDescription) + "</div>" +
                                  "<div >Цена: " + utilsService.getStringOrEmpty(board.price) + "</div>" +
                                  "<div ><a href='#/boards/" + board.id + "'>Подробнее</a></div>" +
                              "</div>",
                    compileMessage: true
                };
                unfilteredMarkers.push(marker);
            }
            
        });
        $scope.markers = unfilteredMarkers;
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
            // console.log("isPlacesExsits " + isPlacesExsits);
            if (isPlacesExsits) {
                // console.log("isPlacesExsits " + isPlacesExsits + " fpr places");
                var placesArray = places.split(",");
                var placesInput = $scope.filterData.filterPlaces.toLowerCase().split(", ");
                for (var i = 0; i < placesArray.length; ++i) {
                    // console.log("check " + placesArray[i].trim() + " in " + placesInput + " result " + _.contains(placesInput, placesArray[i].trim()));
                    if (_.contains(placesInput, placesArray[i].trim())) {
                        // console.log("return for placesInput " + placesInput);
                        return true;
                    }
                }
            }
        },

        filterPriceFrom : "",
        isPriceFromExists : function() {
           
            return $scope.filterData.filterPriceFrom != null 
            && $scope.filterData.filterPriceFrom != undefined 
            && (_.isNumber($scope.filterData.filterPriceFrom) || !_.isEmpty($scope.filterData.filterPriceFrom));  
        },
        checkPriceFrom : function(price) {
            var isPriceExists = price != undefined && price != null;

            return isPriceExists && Number(price) >= Number($scope.filterData.filterPriceFrom);
        },

        filterPriceTo : "",
        isPriceToExists : function() {
            return $scope.filterData.filterPriceTo != null 
            && $scope.filterData.filterPriceTo != undefined 
            && (_.isNumber($scope.filterData.filterPriceTo) || !_.isEmpty($scope.filterData.filterPriceTo)); 
        },
        checkPriceTo : function(price) {
            var isPriceExists = price != undefined && price != null;
            return isPriceExists && Number(price) <= Number($scope.filterData.filterPriceTo);
        },

        isPriceRangeExists : function() {
            return $scope.filterData.isPriceToExists() || $scope.filterData.isPriceFromExists();
        },
        checkPriceRange : function(price) {

            var result = false;

            if ($scope.filterData.isPriceFromExists() && $scope.filterData.isPriceToExists()) {
                result = $scope.filterData.checkPriceFrom(price) || $scope.filterData.checkPriceTo(price);
            } else {

                if ($scope.filterData.isPriceFromExists()) {
                    result = $scope.filterData.checkPriceFrom(price); 
                }

                if ($scope.filterData.isPriceToExists()) {
                    result = $scope.filterData.checkPriceTo(price);
                }
            }

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

        $scope.markers = [];
        if ($scope.filterData.isExists()) {

            setTimeout( function() {
                
                var filtered = _.filter(unfilteredMarkers, function(marker) {
                var markerBoard = marker.board;
                var filterResult = $scope.filterData.checkSurfaceType(markerBoard.surfaceName) ||
                       $scope.filterData.checkAddress(markerBoard.address) ||
                       $scope.filterData.checkDistinct(markerBoard.address) ||
                       $scope.filterData.checkPlaces(markerBoard.entertainmentCenters) ||
                       $scope.filterData.checkPriceRange(markerBoard.price);

                return filterResult;
            });    

            $scope.markers = filtered;
            $scope.$apply();
            }, 10);

        } else {

            setTimeout( function() {
                $scope.markers = unfilteredMarkers;
                $scope.$apply();
            }, 10);

        }
    }

});
