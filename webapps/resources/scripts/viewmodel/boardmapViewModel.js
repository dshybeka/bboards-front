/**
 * Created by dshybeka on 18.01.2015.
 */
define(['knockout', 'boardmapRestController', 'googlemapController'], function(ko, BoardmapRestController, GooglemapController) {

    return function BoardmapViewModel(boardmapSelector) {

       var self = this;

            // self.$boardMap = $(boardmapSelector);
            self.restController = undefined;
            self.googlemapController = undefined;
            
            // observables
            self.boards = ko.observableArray([]);

            self.initViewModel = function() {
                console.log("init view is called");
                self.restController = new BoardmapRestController();
                
                self.restController.retrieveAllBoards(self.boards, function() {
                   console.log("callback is called " + self.boards);
                   self.googlemapController = new GooglemapController(boardmapSelector, self.boards);
                });
            }

            self.initViewModel();
    };
});