/**
 * Created by dshybeka on 18.01.2015.
 */
define(['underscore'], function(_) {

    return function GooglemapController(mapSelector, observableBoards) {

        var self = this;
        //self.$map = $(mapSelector);

        self.initController = function(observableBoards) {

            var myLatlng = new google.maps.LatLng(53.9, 27.5666667);
            var mapOptions = {
                zoom: 11,
                center: myLatlng
            }
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            console.log("observableBoards " + observableBoards + " _ " + _)
            _.each(observableBoards(), function(board) {
                var markerLatlng = new google.maps.LatLng(parseFloat(board.lat), parseFloat(board.lng));
                var marker = new google.maps.Marker({
                    position: markerLatlng,
                    map: map,
                    title: 'Mensk'
                });
            });
        };

        self.initController(observableBoards);
    };
});