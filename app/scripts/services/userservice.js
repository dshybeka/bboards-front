'use strict';

/**
 * @ngdoc service
 * @name bfrontApp.userService
 * @description
 * # userService
 * Service in the bfrontApp.
 */
angular.module('bfrontApp')
  .service('userService', function (appConf, $http) {
    
    this.registration = function(quickRegistrationFields, callback) {

      console.log("registration start");
        
      $http.post(
      
          appConf.serviceBaseUrl + appConf.restUrls.registration,
          { fio: quickRegistrationFields.fio,
            email: quickRegistrationFields.email,
            password: quickRegistrationFields.password,
            passwordConfirmation: quickRegistrationFields.passwordConfirmation,
            phone: quickRegistrationFields.phone })

        .success(function(data) {
      
          console.log('registered success: ' + data);
          callback(data);

      }).
      error(function(data) {
          console.log('login error: ' + data);
          callback(data);
          // $scope.errorMessage = "Ошибка во время регистрации, пожалуйста повторите позже";
      });

    };

    this.getCurrentUser = function(username, callback) {

      console.log("get usre for username " + username);

      var self = this;
        
      $http.get(appConf.serviceBaseUrl + appConf.restUrls.user + "/" + username)
        .success(function(data) {

            if (data.success === true) {

                var user = data.model;
                console.log("user found");
                self.user = user;
            } else {
                console.log("error while retrieving user");
            }

            callback(self.user);
        }).error(function() {
            console.log("fail while retrieving user ");
        });

    };

  });
