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
    serviceBaseUrl: "http://bservice-bboards.rhcloud.com/bservice",
    // serviceBaseUrl: "http://localhost:8080/bservice",

    restUrls: {
      boards: "/rest/boards",
      registration: "/rest/user/register",
      fullregister: "/rest/user/full-register",
      user: "/rest/user"
    },

    minskCenter: {
        lat: 53.9,
        lng: 27.56,
        zoom: 11
    }

  });
