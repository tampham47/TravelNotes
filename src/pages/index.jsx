/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var RatchetLayout = React.createFactory(require('../layouts/RatchetLayout'));
var $ = require('jquery');

var HomePage = React.createClass({
  displayName: 'Home page',

  getDefaultProps: function() {
    return {
      layout: RatchetLayout,
      title: 'Home'
    };
  },

  componentDidMount: function() {
    $.ajax({
      type: 'POST',
      url: 'http://young-beyond-8772.herokuapp.com/auth',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ 'name': 'Amos' }),
      success: function(data) {
        console.log('componentDidMount', data);
      },
      error: function(err) {
        console.log('err', err);
      }
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
