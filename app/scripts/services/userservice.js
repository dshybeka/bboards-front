'use strict';

/**
 * @ngdoc service
 * @name bfrontApp.userService
 * @description
 * # userService
 * Service in the bfrontApp.
 */
angular.module('bfrontApp')
  .service('userService', function ($rootScope, appConf, $http, $localStorage) {
    
    this.registration = function(quickRegistrationFields, callback) {

      console.log("registration start");
        
      $rootScope.spinner.active = true;
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
      }).finally(function() {
        $rootScope.spinner.active = false;
      });

    };

    this.updateFullRegistration = function($rootScope, fullRegDetails, callback) {

      console.log("full registration start");
        
      $rootScope.spinner.active = true;
      $http.post(
      
          appConf.serviceBaseUrl + appConf.restUrls.fullregister,
          { legalName: fullRegDetails.legalName,
          legalAddress: fullRegDetails.legalAddress,
          postalAddress: fullRegDetails.postalAddress,
          currentAccount: fullRegDetails.currentAccount,
          bank: fullRegDetails.bank,
          bankNumber: fullRegDetails.bankNumber,
          unp: fullRegDetails.unp,
          chefFio: fullRegDetails.chefFio,
          contactPerson: fullRegDetails.contactPerson,
          contactPersonPhone: fullRegDetails.contactPersonPhone,
          contactPersonEmail: fullRegDetails.contactPersonEmail,
          under: fullRegDetails.under,
          username: localStorage["username"] }, getHttpConfig() )

        .success(function(data) {
      
          console.log('full registered success: ' + data);
          callback(data);

      }).
      error(function(data) {
          console.log('full reg error: ' + data);
          callback(data);
          // $scope.errorMessage = "Ошибка во время регистрации, пожалуйста повторите позже";
      }).finally(function() {
        $rootScope.spinner.active = false;
      });
    }

    this.getCurrentUser = function(username, callback) {


      var self = this;
      
      var curUser = $localStorage.curUser;
      if (curUser === undefined || curUser.username === undefined ) {
        $http.get(appConf.serviceBaseUrl + appConf.restUrls.user + "/" + username, getHttpConfig())
          .success(function(data) {

              if (data.success === true) {

                  var user = data.model;
                  self.user = user;
                  $localStorage.curUser = user;
                  console.log("user is retrieved success");
              } else {
                  console.log("error while retrieving user");
              }

              callback(self.user);
          }).error(function() {
              console.log("fail while retrieving user ");
          });
      } else {
        console.log("use is retrieved from cache " + curUser.username);
        callback(curUser);
      }

    };

  });
