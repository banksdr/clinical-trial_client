"use strict";

import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import Dashboard from './components/Dashboard';

class Routes extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route component={App}>
          <Route path="/" component={Dashboard} />
        </Route>
      </Router>
    )
  }
}

export default Routes;
