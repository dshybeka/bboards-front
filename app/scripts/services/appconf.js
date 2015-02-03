'use strict';

/**
 * @ngdoc service
 * @name bfrontApp.AppConf
 * @description
 * # AppConf
 * Constant in the bfrontApp.
 */
angular.module('bfrontApp')
  .constant('appConf', {
    admBaseUrl: "http://badmin-bboards.rhcloud.com/badmin",
    // serviceBaseUrl: "http://bservice-bboards.rhcloud.com/bservice",
    serviceBaseUrl: "http://localhost:8080/bservice",

    restUrls: {
      boards: "/rest/boards",
    }

  });
