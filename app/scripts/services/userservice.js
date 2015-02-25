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

  });
