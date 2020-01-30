const REQ_CREATE_ROOM = 'roomInfo/REQ_CREATE_ROOM';
const REC_GET_ROOMS = 'roomInfo/REC_GET_ROOMS';

const defaultState = {
  rooms: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case REC_GET_ROOMS:
      return {
        rooms: action.rooms,
      };
    default:
      return state;
  }
};
