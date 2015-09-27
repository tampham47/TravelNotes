'use strict';

var $ = require('jquery');
var config = require('../config');
var apiList, result = {};

// define list of api
apiList = [
  { name: 'auth', path: '/auth', method: 'POST'},
  { name: 'getTravelers', path: '/travelers', method: 'GET'},
  { name: 'updateTravel', path: '/travelers/:userId', method: 'PATCH'}];

// create functions with each api link
$.each(apiList, function(index, item) {
  result[item.name] = function(data) {
    // in this case, 'this' is a object was referenced from Adapter
    return $.ajax({
      url: config.apiPath + item.path,
      type: item.method,
      headers: {
        'Content-Type': 'application/json'
      },
      cache: false,
      data: JSON.stringify(data)
    });
  };
});

module.exports = result;
