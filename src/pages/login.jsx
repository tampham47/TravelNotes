/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var RatchetLayout = React.createFactory(require('../layouts/RatchetLayout'));
var ServiceApi = require('../services/service-api');

var HomePage = React.createClass({

  getDefaultProps: function() {
    return {
      layout: RatchetLayout,
      title: 'Login'
    };
  },
  getInitialState: function() {
    return {
      model: {}
    };
  },
  /**
   * update state when input has changes
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  onChange: function(e) {
    var model = this.state.model;
    model[e.target.name] = e.target.value;

    this.setState({model: model});
  },

  onLoginClicked: function(e) {
    e.preventDefault();

    var data = this.state.model;
    ServiceApi.auth({name: data.userName})
    .then(function(data) {
      // set token into localstorage
      console.log('data', data);
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('name', data.name);
      window.localStorage.setItem('id', data.id);
      window.location.hash = '/';
    });
  },

  render: function() {
    return (
      <div>
        <div className="login-panel">
          <form>
            <p className="login-label">Enter your name</p>
            <input type="text" name='userName' ref='userName' placeholder="Your Name"
              value={this.state.model.userName} onChange={this.onChange} />
            <button className="btn-add u-full-width" onClick={this.onLoginClicked}>Login</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
