'use strict';

/**
 * @ngdoc directive
 * @name bfrontApp.directive:showLogin
 * @description
 * # showLogin
 */
angular.module('bfrontApp')
  .directive('showLogin', function() {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {
            var login = element.find('#login-holder-js');
            var loginError = element.find('#login-error');
            // var main = element.find('#content');
            var username = element.find('#username-js');
            var password = element.find('#password-js');
 
            login.hide();
            loginError.hide();
 
            scope.$on('event:auth-loginRequired', function() {
                console.log('showing login form');
                // main.hide();
                username.val('');
                password.val('');
                login.show();
            });
            scope.$on('event:auth-loginFailed', function() {
                console.log('showing login error message');
                username.val('');
                password.val('');
                loginError.show();
            });
            scope.$on('event:auth-loginConfirmed', function() {
                console.log('hiding login form');
                // main.show();
                login.hide();
                username.val('');
                password.val('');
            });
        }
    }
});
