'use strict';

describe('Directive: showLogin', function () {

  // load the directive's module
  beforeEach(module('bfrontApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<show-login></show-login>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the showLogin directive');
  }));
});
