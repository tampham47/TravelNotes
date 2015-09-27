/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var RatchetLayout = React.createFactory(require('../layouts/RatchetLayout'));
var ServiceApi = require('../services/service-api');

var HomePage = React.createClass({
  displayName: 'Home page',

  getDefaultProps: function() {
    return {
      layout: RatchetLayout,
      title: 'Home'
    };
  },

  componentDidMount: function() {
    ServiceApi.auth({name: 'Amos'}).then(function(data) {
      console.log('componentDidMount', data);
    });
  },

  render: function() {
    return (
      <div>
        <p>HOME PAGE</p>
      </div>
    );
  }
});

module.exports = HomePage;
