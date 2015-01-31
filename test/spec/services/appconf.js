'use strict';

describe('Service: AppConf', function () {

  // load the service's module
  beforeEach(module('bfrontApp'));

  // instantiate service
  var AppConf;
  beforeEach(inject(function (_AppConf_) {
    AppConf = _AppConf_;
  }));

  it('should do something', function () {
    expect(!!AppConf).toBe(true);
  });

});
