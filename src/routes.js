import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// import {
//   HomeContainer,
// } from './containers';
import HomeContainer from './containers/HomeContainer';
import RoomContainer from './containers/RoomContainer';

const Routes = ({ roomId }) => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomeContainer} />
      <Route path="/room" component={RoomContainer} />
    </Switch>
  </Router>
);

export default connect(state => ({
  roomId: state.roomInfo.roomId,
}))(Routes);
