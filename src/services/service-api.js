'use strict';

var Promise = require('promise');
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
    return new Promise(function(resolve, reject) {
      var token = window.localStorage.getItem('token');
      var headers = {
        'Content-Type': 'application/json'
      };

      if (token) {
        headers.Authorization = 'Token token=' + token;
      }

      // replace :userId by real value
      data.params = data.params || {};
      item.path = item.path.replace(':userId', data.params.userId);
      delete data.params;

      $.ajax({
        url: config.apiPath + item.path,
        type: item.method,
        headers: headers,
        cache: false,
        data: JSON.stringify(data),
        success: function(data) {
          resolve(data);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  };
});

module.exports = result;
