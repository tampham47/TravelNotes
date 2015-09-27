/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var RatchetLayout = React.createClass({
  getDefaultProps: function() {
    return {};
  },

  isActive: function(target) {
    var uri = this.props.uri[0];
    if (uri === target) {
      return 'active';
    } else {
      return '';
    }
  },

  onLogoutClicked: function() {
    window.localStorage.removeItem('token');
    window.location.hash = '/login';
  },

  render: function() {
    return (
      <div>
        <header className="bar bar-nav">
          <h1 className="title">{ this.props.title || 'title' }</h1>
        </header>

        <div className="container-ratchet">
          {this.props.children}
        </div>

        <nav className="bar bar-tab">
          <a className={ "tab-item " + this.isActive('')} href="#/">
            <span className="icon icon-home"></span>
            <span className="tab-label">Home</span>
          </a>
          <a className={ "tab-item " + this.isActive('notes')} href="#/notes">
            <span className="icon icon-star-filled"></span>
            <span className="tab-label">MyNotes</span>
          </a>

          <a className={ "tab-item " + this.isActive('setting')} href="javascript:;"
            onClick={this.onLogoutClicked} >
            <span className="icon icon-gear"></span>
            <span className="tab-label">Logout</span>
          </a>
        </nav>
      </div>
    );
  }
});

module.exports = RatchetLayout;
