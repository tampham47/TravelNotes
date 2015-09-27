/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var RatchetLayout = React.createFactory(require('../layouts/RatchetLayout'));
var Loader = require('halogen/PulseLoader');
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
    var userId = window.localStorage.getItem('id');
    return {
      user: user,
      userId : userId,
      dataContext: [],
      isLoading: true
    };
  },

  componentDidMount: function() {
    console.log('componentDidMount');
    // getInitialState just run once time
    // so we have to set it again at the next time
    var user = window.localStorage.getItem('name');
    var userId = window.localStorage.getItem('id');
    this.setState({
      user: user,
      userId: userId
    });

    ServiceApi.getTravelers({}).then(function(data) {
      var currentData = [];
      var currentUser = this.state.user;

      for (var i=0; i<data.length; i++) {
        if (data[i].name === currentUser) {
          currentData = data[i];
        }
      }

      this.setState({
        dataContext: currentData.destinations,
        isLoading: false
      });
    }.bind(this));
  },

  onChange: function(index, e) {
    var dataContext = this.state.dataContext;
    dataContext[index].visited = e.target.checked;
    this.setState({dataContext: dataContext});

    this._udpateData(dataContext);
  },

  onRemoveClicked: function(index) {
    var dataContext = this.state.dataContext;
    dataContext.splice(index, 1);
    this.setState({dataContext: dataContext});

    this._udpateData(dataContext);
  },

  onDestinationChanged: function(e) {
    this.setState({destination: e.target.value});
  },

  onAddDestinationClicked: function(e) {
    e.preventDefault();

    var dataContext = this.state.dataContext;
    dataContext.push({
      name: this.state.destination,
      visited: false
    });

    this.setState({
      dataContext: dataContext,
      destination: ''
    });
    this._udpateData(dataContext);
  },

  _udpateData: function(data) {
    console.log('_udpateData', this.state.userId);
    ServiceApi.updateTravel({
      destinations: data,
      params: {userId: this.state.userId},
    })
    .then(function(data){
      console.log('onChange', data);
    });
  },

  render: function() {
    var renderNotes = '';
    var renderLoader = '';

    if (this.state.isLoading) {
      renderLoader = (
        <div className="loader-wrapper">
          <Loader color="#985321" size="16px" margin="4px" />
        </div>
      );
    }

    if (this.state.dataContext.length > 0) {
      renderNotes = (
        <div>
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
                  <button className="remove" onClick={this.onRemoveClicked.bind(null, i)}>✖</button>
                </li>
              )
            }.bind(this))}
          </ul>
        </div>
      )
    }

    return (
      <div>
        {renderLoader}
        <form>
          <input type="text" placeholder="Enter your destination"
            value={this.state.destination} onChange={this.onDestinationChanged} />
          <button className="btn-add u-full-width" onClick={this.onAddDestinationClicked}>Add</button>
        </form>
        {renderNotes}
      </div>
    );
  }
});

module.exports = ContactPage;
