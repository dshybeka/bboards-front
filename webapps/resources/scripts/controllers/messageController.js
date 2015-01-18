/**
 * Created by dshybeka on 18.01.2015.
 */
define( function() {

    return function MessageController() {

        var self = this;

        self.messageSuccess = function(text) {
            console.log("message: " + text);
        };

        self.messageError = function(text) {
            console.log("text: " + text);
        };
    };
});