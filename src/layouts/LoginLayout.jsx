/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var RatchetLayout = React.createClass({
  getDefaultProps: function() {
    return {};
  },

  render: function() {
    return (
      <div>
        <div className="container-ratchet login-page">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = RatchetLayout;
