/**
 * Created by dshybeka on 18.01.2015.
 */
define(function() {
    return function BoardPartial(board) {

        var self = this;

        if (board.mapPosition) {

            self.lng = board.mapPosition.lng;
            self.lat = board.mapPosition.lat;
            self.zoom = board.mapPosition.zoom;
        } else {
            self.lng = 0;
            self.lat = 0;
            self.zoom = 0;
        }
    };
});