'use strict';

/**
 * @ngdoc directive
 * @name bfrontApp.directive:showLogin
 * @description
 * # showLogin
 */
angular.module('bfrontApp')
  .directive('showLogin', ['$location', function($location) {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {
            var login = element.find('#login-holder-js');
            var loginError = element.find('#login-error-js');
            var overlay = element.find(".overlay");
            var mainContainer = $('#main-container-js');
            var username = element.find('#username-js');
            var password = element.find('#password-js');
 
            console.log("login22 " + mainContainer.html());
            login.hide();
            loginError.hide();
            overlay.hide();
 
            scope.$on('event:auth-loginRequired', function() {
                console.log('showing login form');
                // main.hide();
                username.val('');
                password.val('');
                login.show();
                overlay.show();

                mainContainer.hide();
            });
            scope.$on('event:auth-loginFailed', function() {
                console.log('showing login error message');
                username.val('');
                password.val('');
                loginError.show();
                overlay.show();
            });
            scope.$on('event:auth-loginConfirmed', function() {
                console.log('hiding login form');
                // main.show();
                login.hide();
                overlay.hide();
                loginError.hide();
                username.val('');
                password.val('');

                mainContainer.show();
            });

            overlay.on('click', function() {
                login.hide();
                loginError.hide();
                overlay.hide();
                mainContainer.show();

                $location.path("/");
                scope.$apply();
                console.log("location path!!");
            });
        }
    }
}]);
