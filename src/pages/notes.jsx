/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var RatchetLayout = React.createFactory(require('../layouts/RatchetLayout'));

var ContactPage = React.createClass({

  getDefaultProps: function() {
    return {
      layout: RatchetLayout,
      title: 'Notes'
    };
  },

  render: function() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Enter your destination" />
        </form>
      </div>
    );
  }
});

module.exports = ContactPage;
