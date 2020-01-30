import { connect } from 'react-redux';

import Room from '../../pages/Room';
import { userLeave } from '../../redux/modules/roomInfo';

const RoomContainer = connect(
  state => ({
    roomId: state.roomInfo.roomId,
    users: state.roomInfo.users,
    user: state.roomInfo.user,
  }),
  { userLeave },
)(Room);

export default RoomContainer;
