import { connect } from 'react-redux';

import Home from '../../pages/Home/Home';

const HomeContainer = connect(
  state => ({
    rooms: state.rooms.rooms,
  })
)(Home);

export default HomeContainer;
