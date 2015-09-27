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
      title: 'Travel Notes'
    };
  },

  getInitialState: function() {
    return {
      dataContext: []
    };
  },

  componentDidMount: function() {
    ServiceApi.getTravelers({}).then(function(data) {
      console.log('componentDidMount', data);
      this.setState({dataContext: data});
    }.bind(this));
  },

  renderDestinations: function(notes) {
    console.log('renderUserList', notes);
    return (
      <ul className="table-view">
        {notes.destinations.map(function(item) {
          return (
            <li className="table-view-cell">
              <a className="navigate-right">
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    );
  },

  renderUsers: function(users) {
    return users.map(function(item) {
      return (
        <div key={item.id} className="user-list">
          <h4 className="user-title">{item.name}</h4>
          <ul className="table-view">
            {item.destinations.map(function(des, i) {
              return (
                <li className="table-view-cell" key={i}>
                  <a className="navigate-right">
                    {des.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      );
    });
  },

  render: function() {
    return (
      <div>
        {this.renderUsers(this.state.dataContext)}
      </div>
    );
  }
});

module.exports = HomePage;
