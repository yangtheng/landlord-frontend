const REQ_CREATE_ROOM = 'roomInfo/REQ_CREATE_ROOM';
const REC_CREATE_ROOM = 'roomInfo/REC_CREATE_ROOM';

const defaultState = {
  rooms: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case REC_CREATE_ROOM:
      return {
        rooms: action.rooms,
      };
    default:
      return state;
  }
};
