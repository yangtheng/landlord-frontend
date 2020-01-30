// import io from "socket.io-client";
// const ENDPOINT = 'localhost:3001';

const REC_CREATOR_JOIN = 'roomInfo/REC_CREATOR_JOIN';
const REQ_USER_JOIN = 'roomInfo/REQ_USER_JOIN';
const REC_USER_JOIN = 'roomInfo/REC_USER_JOIN';
const REQ_USER_LEAVE = 'roomInfo/REQ_USER_LEAVE';
const REC_USER_LEAVE = 'roomInfo/REC_USER_LEAVE';

// let socket = io(ENDPOINT);

const defaultState = {
  roomId: '',
  users: [],
  user: '',
};

// Reducer
export default (state = defaultState, action) => {
  switch (action.type) {
    case REQ_USER_JOIN:
      return {
        ...state,
        roomId: action.roomId,
        user: action.user,
      }
    case REQ_USER_LEAVE:
      return defaultState;
    case REC_USER_JOIN:
    case REC_USER_LEAVE:
      return {
        ...state,
        ...{
          users: action.users,
        },
      };
    case REC_CREATOR_JOIN:
      return {
        roomId: action.roomId,
        users: action.users,
        user: action.user,
      };
    default:
      return state;
  }
};

// export action creators
export const recCreatorJoin = (roomId, user, users) => ({
  type: REC_CREATOR_JOIN,
  roomId,
  user,
  users,
});

const reqUserJoin = (user, roomId) => ({
  type: REQ_USER_JOIN,
  user,
  roomId,
});

export const recUserJoin = users => ({
  type: REC_USER_JOIN,
  users,
});

const reqUserLeave = () => ({
  type: REQ_USER_LEAVE,
});

export const recUserLeave = users => ({
  type: REC_USER_LEAVE,
  users,
});

export const userJoin = (user, roomId) => {
  return dispatch => {
    dispatch(reqUserJoin(user, roomId));
  }
}

export const userLeave = () => {
  return dispatch => {
    dispatch(reqUserLeave());
  };
}
