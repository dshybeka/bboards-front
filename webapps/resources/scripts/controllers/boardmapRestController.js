/**
 * Created by dshybeka on 18.01.2015.
 */
define(['knockout', 'messageController', 'restUrlConfig', 'boardPartial', 'jquery'],
    function (ko, MessageController, RestUrlConfig, BoardPartial, $) {

    return function RestController() {

        var self = this;
        self.messageController = undefined;

        self.initController = function() {
            self.messageController = new MessageController();
        };

        self.retrieveAllBoards = function(observableBoards, callback) {

            $.ajax({
                type: 'GET',
                url: RestUrlConfig.getBoardsUrl
            }).done(function(data) {

                if (data.success === true) {

                    var boards = data.model;
                    self.messageController.messageSuccess("boards retrieved");
                    observableBoards(ko.utils.arrayMap(boards, function (board) {
                        return new BoardPartial(board)
                    }));
                } else {
                    self.messageController.messageError("error while retrieving boards");
                }

                callback();
            }).fail(function() {
                self.messageController.messageError("fail while retrieving boards");
            });
        };

        self.initController();
    };
});