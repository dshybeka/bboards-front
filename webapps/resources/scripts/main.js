requirejs.config({
    "baseUrl": "resources/scripts",
    "paths": {

        "restUrlConfig": "restUrlConfig",

        // Viewmodels
        "boardmapViewMode": "viewmodel/boardmapViewModel",

        // Libs
        "knockout": "//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-debug",
        "underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore",
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min",

        // Controllers
        "boardmapRestController": "controllers/boardmapRestController",
        "googlemapController": "controllers/googlemapController",
        "messageController": "controllers/messageController",
        // Models
        "boardPartial": "model/BoardPartial"
    }
});

require(['knockout', 'viewmodel/boardmapViewModel',], function(ko, BoardmapViewModel) {
    console.log("start require ");
    ko.applyBindings(new BoardmapViewModel("#map-canvas"));
});