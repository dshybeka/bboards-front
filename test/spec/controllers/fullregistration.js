'use strict';

describe('Controller: FullregistrationCtrl', function () {

  // load the controller's module
  beforeEach(module('bfrontApp'));

  var FullregistrationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FullregistrationCtrl = $controller('FullregistrationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
