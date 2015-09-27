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
    // get data
    ServiceApi.getTravelers({}).then(function(data) {
      console.log('data', data);
      this.setState({dataContext: data});
    }.bind(this));
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
                  <span>
                    <input id={"check-box-"+item.name+i} type="checkbox" data-check checked={des.visited} />
                    <label htmlFor={"check-box-"+item.name+i}><span></span></label> {des.name}
                  </span>
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
