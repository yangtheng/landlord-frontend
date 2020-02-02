import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import {
//   HomeContainer,
// } from './containers';
import HomeContainer from './containers/HomeContainer';
import RoomContainer from './containers/RoomContainer';
import GameContainer from './containers/GameContainer';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={HomeContainer} />
    <Route path="/room" component={RoomContainer} />
    <Route path="/game" component={GameContainer} />
  </Switch>
);

export default Routes;
