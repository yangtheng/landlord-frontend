import io from "socket.io-client";
const ENDPOINT = 'localhost:3001';

const REQ_USER_JOIN = 'roomInfo/REQ_USER_JOIN';
const REC_USER_JOIN = 'roomInfo/REC_USER_JOIN';

let socket = io(ENDPOINT);

const defaultState = {
  roomId: '',
  users: [],
  user: {},
};

// Reducer
export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// export action creators
const reqUserJoin = (user, roomId) => ({
  type: REQ_USER_JOIN,
  user,
  roomId,
});

const recUserJoin = users => ({
  type: REC_USER_JOIN,
  users,
});

export const userJoin = (user, roomId) => {
  // socket emit
  reqUserJoin(user, roomId);
  // socket on
}
