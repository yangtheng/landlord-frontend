import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import {
//   HomeContainer,
// } from './containers';
import HomeContainer from './containers/HomeContainer';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" component={HomeContainer} />
    </Switch>
  </Router>
);

export default Routes;
