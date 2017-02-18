import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Components from './components';
import Pages from './pages';

import io from 'socket.io-client';

import './App.css';

const socket = io('http://0.0.0.0:4016');

class App extends Component {
  getChildContext() {
    return {
      socket: socket,
    };
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Components.BasicLayout}>
          <Route path="/:clientId" component={Pages.Client} />
          <Route path="/:clientId/admin" component={Pages.AdminContainer} />
        </Route>
      </Router>
    );
  }
}

App.childContextTypes = {
  socket: React.PropTypes.object.isRequired,
};

export default App;
