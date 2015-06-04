'use strict';
angular.module('bfrontApp').service('orderService', function($http, appConf){

  var self = this;

  var orders = [];

  this.getOrdersByBoardId = function(id, callback) {

    console.log("retireve order by boardId");

    $http.get(appConf.serviceBaseUrl + appConf.restUrls.boards + '/' + id + '/orders', getAuthenticateHttpConfig())
      .success  (function(data) {

      if (data.success === true) {

        self.orders = data.model;
        console.log("orders retrieved " + self.orders.length);

      } else {
        console.log("error while retrieving orders");
      }
      callback(self.orders);
      return self.orders;
    }).error(function() {
        console.log("fail while retrieving orders");
      });
  };

  this.saveOrder = function(order) {

    var message = {
      text: "",
      type: ""
    };
    $http.post(appConf.serviceBaseUrl + "/rest/order/save",
      order,
      getAuthenticateHttpConfig())
      .success(function(data) {

        console.log('Order created');

        message.text = data.model;
        message.type = 'alert-success';

        if (data.success === false) {
          message.text = data.model;
          message.type = 'alert-danger';
        }

      }).
      error(function(data) {
        console.log('Error while order creating');
        message.text = 'Не удалось оформить заказ. ' + data;
        message.type = 'alert-danger';
      });

    return message;
  }

});
