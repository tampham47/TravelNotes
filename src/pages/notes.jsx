/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var RatchetLayout = React.createFactory(require('../layouts/RatchetLayout'));
var ServiceApi = require('../services/service-api');

var ContactPage = React.createClass({

  getDefaultProps: function() {
    return {
      layout: RatchetLayout,
      title: 'Notes'
    };
  },

  getInitialState: function() {
    var user = window.localStorage.getItem('name');
    return {
      user: user,
      dataContext: []
    };
  },

  componentDidMount: function() {
    ServiceApi.getTravelers({}).then(function(data) {
      var currentData = [];
      var currentUser = this.state.user;

      for (var i=0; i<data.length; i++) {
        if (data[i].name === currentUser) {
          currentData = data[i];
        }
      }

      this.setState({dataContext: currentData.destinations});
    }.bind(this));
  },

  onChange: function(index, e) {
    var dataContext = this.state.dataContext;
    dataContext[index].visited = e.target.checked;
    this.setState({dataContext: dataContext});
  },

  render: function() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Enter your destination" />
        </form>

        <p className="login-label">Your notes</p>
        <ul className="table-view">
          {this.state.dataContext.map(function(des, i) {
            return (
              <li className="table-view-cell" key={i}>
                <span>
                  <input id={"check-box-"+this.state.user+i} type="checkbox" data-check
                    checked={des.visited} onChange={this.onChange.bind(null, i)} />
                  <label htmlFor={"check-box-"+this.state.user+i}><span></span></label> {des.name}
                </span>
                <button className="remove">✖</button>
              </li>
            )
          }.bind(this))}
        </ul>
      </div>
    );
  }
});

module.exports = ContactPage;
