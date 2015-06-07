'use strict';

/**
 * @ngdoc service
 * @name bfrontApp.utilsService
 * @description
 * # utilsService
 * Service in the bfrontApp.
 */
angular.module('bfrontApp')
  .service('utilsService', function () {
    
    var self = this;

    self.getStringOrEmpty = function(input) {

      var result = "";
      if (!_.isNull(input) && !_.isUndefined(input)) {
        result = input;
      }

      return result;
    };

  });
