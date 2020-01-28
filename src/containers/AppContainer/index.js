import { connect } from 'react-redux';

import { App } from '../../pages';

const AppContainer = connect(
  state => ({
    user: state.userInfo,
    room: state.roomInfo,
  })
)(App);

export default AppContainer;
