import { connect } from 'react-redux';

import Home from '../../pages/Home/Home';
import { userJoin } from '../../redux/modules/roomInfo';

const HomeContainer = connect(
  state => ({
    rooms: state.rooms.rooms,
  }),
  { userJoin },
)(Home);

export default HomeContainer;
